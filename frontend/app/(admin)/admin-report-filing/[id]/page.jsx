import ReportDetails from "@/app/components/admin/ReportDetails";

export async function generateStaticParams() {
    const res = await fetch("http://localhost:8080/reports-filing/getAllReports");
    const data = await res.json();
    return data.map((repfil) => ({
        repfilId: repfil.repfilId.toString(),
    }));
}

async function getProduct(repfilId) {
    const res = await fetch(`http://localhost:8080/reports-filing/findReportByRepFilId/${repfilId}`);
    const data = await res.json();
    return data;
}

export default async function page({ params }) {
    const data = await getProduct(params.id);

    const fullName = data.firstName + " " + data.middleInitial + " " + data.lastName;

    return (
        <ReportDetails data={data} fullName={fullName} />
    );
}
