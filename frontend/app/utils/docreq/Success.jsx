import { useRouter } from "next/navigation";

const Success = () => {
  const router = useRouter();

  const handleBackToDocReqPage = () => {
    router.push("/dashboard");
  };

  return (
    <div className="h-96 w-full bg-cover text-black mb-8">
      <div className="flex justify-center flex-col my-auto ml-12 mr-96 h-full">
        <h1 className="font-bold text-5xl mb-8">Request Submitted Successfully!</h1>
        <span className=" flex justify-center font-small text-lg mt-2 mr-96">
          Your request has been successfully submitted. You will be notified as
          soon as your requested document is ready to claim/pickup. You can also
          check the status of your request in your profile. Thank you for using
          our service!
        </span>
        <span
          className="flex justify-start font-small text-lg mt-5 mr-96 underline"
          onClick={handleBackToDocReqPage}
        >
          Back to report page
        </span>
      </div>
    </div>
  );
};

export default Success;
