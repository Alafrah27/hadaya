import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../lib/axios.js";
import { toast } from "react-toastify";

export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data) => axiosInstance.post("auth/register", data),
    onSuccess: () => {
      navigate("/verify-email");
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.response.data.message);
    },
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => await axiosInstance.post("auth/login", data),
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.response.data.message);
    },
  });
};

export const useOtpCode = () => {

  return useMutation({
    mutationFn: async (otpCode) =>
      await axiosInstance.post("auth/verify-otp", otpCode),
    onError: (error) => {
      console.log(error);
      toast.error("Invalid OTP or not Matched");
    },
  });
};

export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => await axiosInstance.post("auth/logout"),
    onSuccess: () => {
      queryClient.setQueryData(["user"], null);
      navigate("/");
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.response.data.message);
    },
  });
};

export const useGetMe = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => await axiosInstance.get("auth/me"),
    retry: false,
  });
};
