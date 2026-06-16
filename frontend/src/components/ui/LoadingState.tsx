interface LoadingStateProps {
  message?: string;
}

export default function LoadingState({ message = "Carregando planos..." }: LoadingStateProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
      <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-brand-600" />
      <p className="text-sm font-medium text-slate-600">{message}</p>
    </div>
  );
}
