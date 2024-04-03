import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosGlobal from "../libs/axios";
import { ProductModel } from "../types/product.model";
import { useRef } from "react";

type Props = {};

const postProduct = async (product: ProductModel) => {
  const res = await axiosGlobal.post("/produits", product);
  return res.data;
};
export default function AjouterProduit({}: Props) {
  const formRef = useRef(null);
  //   invalide
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: postProduct,
    onSuccess(data) {
      console.log(data);
      //   @ts-ignore
      formRef.current?.reset();
      queryClient.invalidateQueries({ queryKey: ["produits"] });
    },
  });
  const handleForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formaData = new FormData(event.currentTarget);
    const title = formaData.get("name") as string;
    const price = formaData.get("prix") as unknown as number;
    const category = formaData.get("category") as string;
    const description = formaData.get("description") as string;
    const image = formaData.get("image") as string;

    mutation.mutate({
      title,
      price,
      category,
      description,
      image,
    });
  };

  return (
    <section className="bg-white ">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 ">
          Add a new product
        </h2>
        <form onSubmit={handleForm} ref={formRef}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="sm:col-span-2">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Nom produit
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5     dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Type product name"
                required
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="brand"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Image url
              </label>
              <input
                type="text"
                name="image"
                id="image"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5     dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Product brand"
                required
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="price"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Prix
              </label>
              <input
                type="number"
                name="prix"
                id="prix"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5     dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="$2999"
                required
              />
            </div>
            <div>
              <label
                htmlFor="category"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Categorie
              </label>
              <select
                id="category"
                name="category"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5     dark:focus:ring-primary-500 dark:focus:border-primary-500"
              >
                <option selected>Select category</option>
                <option value="TV">TV/Monitors</option>
                <option value="PC">PC</option>
                <option value="GA">Gaming/Console</option>
                <option value="PH">Phones</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={8}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500     dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Your description here"
              ></textarea>
            </div>
          </div>
          <button
            type="submit"
            className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg bg-blue-500"
          >
            Ajouter un produit
          </button>
        </form>
      </div>
    </section>
  );
}
