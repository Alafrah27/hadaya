import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "../lib/axios.js";
import { toast } from "react-toastify";

export const useCreateGift = () => {
  return useMutation({
    mutationFn: (data) => axiosInstance.post("gift/create", data),
    onError: (error) => {
      console.log(error);
      toast.error(error.response.data.message);
    },
  });
};

export const useGetGiftBySlug = (slug) => {
  return useQuery({
    queryKey: ["slug", slug],
    queryFn: async () => await axiosInstance.get(`gift/${slug}`),
    onError: (error) => {
      console.log(error);
      toast.error(error.response.data.message);
    },
    retry: false,
  });
};

export const useGenerateGiftQR = (id) => {
  return useQuery({
    queryKey: ["giftQR", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`gift/qr/${id}`);
      return res.data; // Returns { qr: "base64...", gift: { ... } }
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.response.data.message);
    },
    retry: false,
  });
};

export const useClaimGift = () => {
  return useMutation({
    mutationFn: ({ slug, data }) =>
      axiosInstance.post(`gift-claim/claim/${slug}`, data),
    onError: (error) => {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    },
  });
};

export const useDeclineGift = () => {
  return useMutation({
    mutationFn: (slug) => axiosInstance.post(`gift-claim/decline/${slug}`),
    onError: (error) => {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    },
  });
};

export const useMyGifts = () => {
  return useQuery({
    queryKey: ["myGifts"],
    queryFn: async () => await axiosInstance.get("gift/mygifts"),
    onError: (error) => {
      console.log(error);
      toast.error(error.response.data.message);
    },
  });
};
