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

export const getEventTimeRange = (time, ampm, duration) => {
    let [hours, minutes] = time.split(":").map(Number);

    if (ampm === "PM" && hours !== 12) hours += 12;
    if (ampm === "AM" && hours === 12) hours = 0;

    let endHours = hours + duration;
    let endMinutes = minutes;

    let startPeriod = ampm;
    let endPeriod = endHours >= 12 ? "PM" : "AM";

    if (endHours > 12) endHours -= 12;
    if (endHours === 0) endHours = 12; 

    let startTime = `${String(hours % 12 || 12).padStart(2, "0")}:${String(minutes).padStart(2, "0")} ${startPeriod}`;
    let endTime = `${String(endHours).padStart(2, "0")}:${String(endMinutes).padStart(2, "0")} ${endPeriod}`;

    return `${startTime} - ${endTime}`;
}
