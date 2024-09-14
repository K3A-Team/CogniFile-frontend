import Footer from "@/src/app/components/core/footer";
import Navbar from "@/src/app/components/core/navbar";
import Plans from "@/src/app/components/landing/plans";

const Page = () => {
    return (
        <div>
            <Navbar />
            <div className="m-auto container flex flex-col items-center gap-24 py-24 mt-24 z-0">
                <Plans />
            </div>
            <Footer />
        </div>
    );
};

export default Page;