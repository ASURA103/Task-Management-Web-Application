export default function Input({
  id,
  label,
  type,
  placeholder,
  value,
  onChange,
  onKeyDown,
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="font-semibold text-slate-700 dark:text-slate-300"
      >
        {label}
      </label>

      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        required
        className="
          w-full
          px-4
          py-3
          rounded-xl
          border
          border-slate-300
          dark:border-slate-700
          dark:bg-slate-900
          dark:text-white
          outline-none
          transition-all
          duration-300
          focus:border-blue-500
          focus:ring-4
          focus:ring-blue-200
        "
      />
    </div>
  );
}
