import DocumentRequestDetails from "@/app/components/admin/DocumentRequestDetails";

export async function generateStaticParams() {
    const res = await fetch("http://localhost:8080/document-requests/all-document-requests");
    const data = await res.json();
    return data.map((docreq) => ({
        docreqId: docreq.docreqId.toString(),
    }));
}

async function getProduct(docreqId) {
    const res = await fetch(`http://localhost:8080/document-requests/doc-req/${docreqId}`);
    const data = await res.json();
    return data;
}

export default async function page({ params }) {
    const data = await getProduct(params.id);

    const fullName = data.firstName + " " + data.middleInitial + " " + data.lastName;

    return (
        <DocumentRequestDetails data={data} fullName={fullName} />
    );
}
