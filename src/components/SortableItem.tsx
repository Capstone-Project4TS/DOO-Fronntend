import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';

export function SortableItem(props: any) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({id: props.id, title: props.title });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
    <div className="flex gap-2">
                              <img src="/asset/icons/order.svg" />
                              <p className="text-[#667085] text-sm">{props.title}</p>
                              <div>
                                <img
                                  // onClick={() => {
                                  //   handleDeleteDocument(item);
                                  // }}
                                  src="/asset/icons/delete.svg"
                                />
                              </div>
                            </div>
    </div>
  );
}