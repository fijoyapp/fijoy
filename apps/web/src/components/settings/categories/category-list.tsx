import invariant from "tiny-invariant";
import {
  draggable,
  dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { GripVertical, Plus, Receipt } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import _ from "lodash";
import { TransactionTypeEnum } from "@/types/transaction";
import { Category } from "@/gen/proto/fijoy/v1/category_pb";
import { ReactNode, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type CategoryListProps = {
  categories: Category[];
  categoryType: TransactionTypeEnum;
  onAddNewCategory: (categoryType: TransactionTypeEnum) => void;
};
export function CategoryList({
  categories,
  categoryType,
  onAddNewCategory,
}: CategoryListProps) {
  return (
    <Card className="md:min-w-80">
      <CardContent className="pb-0">
        <AccordionItem value={categoryType} className="border-none ">
          <AccordionTrigger>
            <Receipt className="h-4 w-4 !transform-none" />
            {_.capitalize(categoryType)}
          </AccordionTrigger>
          <AccordionContent className="space-y-2">
            <Button
              variant="secondary"
              className="w-full gap-1"
              onClick={() => onAddNewCategory(categoryType)}
            >
              <Plus className="h-4 w-4" />
              New
            </Button>
            {categories.map((category) => (
              <CategoryCard category={category} key={category.id} />
            ))}
          </AccordionContent>
        </AccordionItem>
      </CardContent>
    </Card>
  );
}

function CategoryCardHolder({ children }: { children: ReactNode }) {
  const ref = useRef(null);
  const [isDraggedOver, setIsDraggedOver] = useState(false);

  useEffect(() => {
    const el = ref.current;
    invariant(el);

    return dropTargetForElements({
      element: el,
      onDragEnter: () => setIsDraggedOver(true),
      onDragLeave: () => setIsDraggedOver(false),
      onDrop: () => setIsDraggedOver(false),
    });
  }, []);

  return (
    <div className={cn("", isDraggedOver && "bg-cyan-300")} ref={ref}>
      {children}
    </div>
  );
}

function CategoryCard({ category }: { category: Category }) {
  const ref = useRef(null);
  const [dragging, setDragging] = useState<boolean>(false); // NEW

  const dragHandleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const el = ref.current;
    invariant(el);
    invariant(dragHandleRef.current);

    return draggable({
      element: el,
      dragHandle: dragHandleRef.current,
      onDragStart: () => setDragging(true),
      onDrop: () => setDragging(false),
    });
  }, []);

  return (
    <CategoryCardHolder>
      <Card
        className={cn("flex items-center p-2", dragging && "bg-muted")}
        ref={ref}
      >
        <div>
          {category.name}, {category.position}
        </div>
        <div className="grow"></div>
        <Button
          ref={dragHandleRef}
          variant="ghost"
          size="icon"
          className="h-4 w-4"
        >
          <GripVertical className="h-4 w-4" />
        </Button>
      </Card>
    </CategoryCardHolder>
  );
}
