type InputProps = {
  onChange: (value: number | null) => void;
  onBlur: () => void;
  value: number | null;
  error?: string | false;
};

export default function RatingInput({
  value,
  error,
  onBlur,
  onChange,
}: InputProps) {
  return (
    <div className="rating w-full justify-center text-center">
      <input
        type="radio"
        name="rating-1"
        value={1}
        className="mask mask-star bg-primary"
        checked={value === 1}
        onBlur={onBlur}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <input
        type="radio"
        name="rating-1"
        value={2}
        className="mask mask-star bg-primary"
        checked={value === 2}
        onBlur={onBlur}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <input
        type="radio"
        name="rating-1"
        value={3}
        className="mask mask-star bg-primary"
        checked={value === 3}
        onBlur={onBlur}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <input
        type="radio"
        name="rating-1"
        value={4}
        className="mask mask-star bg-primary"
        checked={value === 4}
        onBlur={onBlur}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <input
        type="radio"
        name="rating-1"
        value={5}
        className="mask mask-star bg-primary"
        checked={value === 5}
        onBlur={onBlur}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      {error && (
        <label className="label">
          <span className="label-text-alt text-error">{error}</span>
        </label>
      )}
    </div>
  );
}
