import { useRouter } from "next/navigation";

const Success = () => {
  const router = useRouter();

  const handleBackToRequestPage = () => {
    router.push("/dashboard");
  };

  return (
    <div className="h-96 w-full bg-cover text-black ">
      <div className="flex justify-center flex-col my-auto ml-12 mr-96 h-full">
        <h1 className="font-bold text-5xl mb-8">
          Request Submitted Successfully!
        </h1>
        <span className=" flex justify-center font-small text-lg mt-2 mr-96">
          Your appointment request has been successfully submitted. We will
          notify you regarding the confirmed meeting format and schedule. Please
          keep an eye on your notifications for updates. You can also check your
          profile for the latest information on your appointment. Thank you for
          using our service!
        </span>
        <span
          className="flex justify-start font-small text-lg mt-5 mr-96 underline"
          onClick={handleBackToRequestPage}
        >
          Back to request page
        </span>
      </div>
    </div>
  );
};

export default Success;
