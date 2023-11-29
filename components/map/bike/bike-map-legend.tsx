import Image from "next/image";

export const BikeMapLegend = () => (
    <section className="flex bg-black text-white p-2 sm:justify-center sm:text-lg text-sm">
        <div className="flex px-2">
            <Image
                src="/marker-icon-blue.png"
                alt="Blue icon representing an empty bike station with no bicycles available"
                title="Empty bike station"
                width={16}
                height={16}
            />
            <span className="pl-2">Empty bike station</span>
        </div>
        <div className="flex px-2">
            <Image
                src="/marker-icon-red.png"
                alt="Red icon representing an active bike station with at least one bicycle available"
                title="Active bike station"
                width={16}
                height={16}
            />
            <span className="pl-2">Active bike station</span>
        </div>
    </section>
);
