import { useRouter } from "next/navigation";

const Success = () => {
  const router = useRouter();

  const handleBackToReportPage = () => {
    router.push("/dashboard");
  };

  return (
    <div className="h-96 w-full bg-cover text-black mb-8">
      <div className="flex justify-center flex-col my-auto ml-12 mr-96 h-full">
        <h1 className="font-bold text-5xl mb-8">Report Filed Successfully!</h1>
        <span className=" flex justify-center font-small text-lg mt-2 mr-96">
          Your report has been successfully filed. We appreciate your
          contribution to our community. Keep an eye on your notifications for
          updates on your report's status. You can also check your profile for
          the latest information. Thank you for making a difference!
        </span>
        <span
          className="flex justify-start font-small text-lg mt-5 mr-96 underline"
          onClick={handleBackToReportPage}
        >
          Back to report page
        </span>
      </div>
    </div>
  );
};

export default Success;
