import { useQuery } from "@tanstack/react-query";
import axiosGlobal from "../libs/axios";
import CardLoading from "./CardLoading";
import { ProductModel } from "../types/product.model";
import { AxiosResponse } from "axios";
import CardProduct from "./CardProduct";

type Props = {};

const getProducts = async () => {
  const res: AxiosResponse = await axiosGlobal("/produits");
  const data: ProductModel[] = res.data;

  return data;
};

export default function Produits({}: Props) {
  const { data, isLoading, isError } = useQuery<ProductModel[]>({
    queryKey: ["produits"],
    queryFn: getProducts,
  });

  if (isLoading)
    return (
      <div className="grid grid-cols-3 gap-3">
        <CardLoading />
        <CardLoading />
        <CardLoading />
        <CardLoading />
        <CardLoading />
      </div>
    );
  return (
    <div className="grid grid-cols-3 gap-3">
      {data?.map((product) => (
        <CardProduct key={product.id} product={product} />
      ))}
    </div>
  );
}
