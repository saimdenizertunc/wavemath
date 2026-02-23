interface AlertBoxProps {
  value: {
    type: "info" | "warning" | "success";
    message: string;
  };
}

const styles = {
  info: {
    border: "border-blue-500",
    bg: "bg-blue-50",
    text: "text-blue-900",
    label: "Info",
  },
  warning: {
    border: "border-amber-500",
    bg: "bg-amber-50",
    text: "text-amber-900",
    label: "Warning",
  },
  success: {
    border: "border-green-500",
    bg: "bg-green-50",
    text: "text-green-900",
    label: "Success",
  },
};

export default function AlertBox({ value }: AlertBoxProps) {
  const s = styles[value.type ?? "info"];
  return (
    <div
      className={`my-6 border-l-4 ${s.border} ${s.bg} rounded-r-lg p-4`}
      role="alert"
    >
      <p className={`text-xs font-semibold uppercase tracking-wider mb-1 ${s.text}`}>
        {s.label}
      </p>
      <p className={`text-sm leading-relaxed ${s.text}`}>{value.message}</p>
    </div>
  );
}
