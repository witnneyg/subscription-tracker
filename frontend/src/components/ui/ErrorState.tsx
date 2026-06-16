interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export default function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="rounded-3xl border border-amber-200 bg-amber-50 p-6 text-center">
      <p className="text-sm font-semibold text-amber-900">{message}</p>
      <p className="mt-2 text-sm text-amber-800">
        Mostrando uma sugestão de planos enquanto a API não responde.
      </p>
      <button
        className="mt-4 rounded-full bg-amber-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-800"
        type="button"
        onClick={onRetry}
      >
        Tentar novamente
      </button>
    </div>
  );
}
