import AppointmentRequestDetails from "@/app/components/admin/AppointmentRequestDetails";

export async function generateStaticParams() {
    const res = await fetch("http://localhost:8080/appointment-requests/get-all-appointment-requests");
    const data = await res.json();
    return data.map((appreq) => ({
        appreqId: appreq.appreqId.toString(),
    }));
}

async function getProduct(appreqId) {
    const res = await fetch(`http://localhost:8080/appointment-requests/get-appointment-request/${appreqId}`);
    const data = await res.json();
    return data;
}

export default async function page({ params }) {
    const data = await getProduct(params.id);

    const fullName = data.firstName + " " + data.middleInitial + " " + data.lastName;

    return (
        <AppointmentRequestDetails data={data} fullName={fullName} />
    );
}
