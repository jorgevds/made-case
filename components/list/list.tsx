import { useMap } from "react-leaflet"
import { ListItem } from "./list.entity"
import { useStore } from "react-redux";

export interface ListProps {
    items: ListItem[]
}

const ListButton: React.FC<{ item: ListItem }> = ({ item }) => {
    const map = useMap();
    if (!map) return null;

    const fly = () => {
        map.flyTo(item.latLng, 14, { duration: 2 });
    }

    return
}

export const List: React.FC<ListProps> = ({ items }) => {
    const store = useStore();

    const { map } = (store.getState() as any).map
    console.log(map)

    return <article className="flex flex-wrap bg-white rounded-lg text-red-500 py-4 mb-4 text-left">
        {items.map(item => (
            <section className="py-2 px-4 basis-3/6" key={`Map key for list item with id: ${item.label}`}>
                <button className="h-full hover:underline" onClick={() => map.flyTo(item.latLng, { zoom: 14 })}>{item.label}</button>
            </section>
        ))}
    </article>
}
