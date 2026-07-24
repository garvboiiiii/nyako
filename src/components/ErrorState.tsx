import NyakoMascot from "./NyakoMascot";

export default function ErrorState({ message }: { message: string }) {
  return (
    <div role="alert" className="mt-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
      <NyakoMascot state="error" size={40} className="shrink-0" />
      <p className="text-sm text-red-800 pt-1.5">{message}</p>
    </div>
  );
}
