import PhanHoiForm from "@/app/components/PhanHoiForm";

export default function UserPhanHoiPage() {
  const khachHangId = 7;

  return (
    <div className="p-4 max-w-xl mx-auto bg-gray-200 text-black mt-8 rounded-3xl ">
      <h1 className="text-4xl font-bold mb-4 flex justify-center">
        Gửi phản hồi
      </h1>
      <PhanHoiForm khachHangId={khachHangId} />
    </div>
  );
}
