import { ListItem } from "./list.entity";

export interface ListProps {
    items: ListItem[];
}

export const List: React.FC<ListProps> = ({ items }) => {
    return (
        <article className="flex flex-wrap bg-white rounded-lg text-red-500 py-4 mb-4 text-left">
            {items.map((item) => (
                <section
                    className="py-2 sm:px-4 px-1 sm:basis-3/6 basis-full"
                    key={`Map key for list item with id: ${item.label}`}
                >
                    <button
                        className="h-full hover:underline"
                        onClick={item.onClick}
                    >
                        {item.label}
                    </button>
                </section>
            ))}
        </article>
    );
};
