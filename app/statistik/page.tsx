import { redirect } from "next/navigation";

export default function StatistikIndexPage() {
    // Redirect to the most common statistic page
    redirect("/statistik/penduduk");
}
