import toast from 'react-hot-toast'

export const toastSuccess = (msg) => {
    toast.success(msg)
}

export const toastError = (msg) => {
    toast.error(msg);
}

export const formatDateDDMON = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", { weekday: "long", day: "2-digit", month: "short" });
  };