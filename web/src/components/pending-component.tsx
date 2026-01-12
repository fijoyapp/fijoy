import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty'
import { Spinner } from '@/components/ui/spinner'

export function PendingComponent() {
  return (
    <Empty className="w-full">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Spinner />
        </EmptyMedia>
        <EmptyTitle>Loading...</EmptyTitle>
        {/* <EmptyDescription> */}
        {/*   Please wait while we process your request. Do not refresh the page. */}
        {/* </EmptyDescription> */}
      </EmptyHeader>
      {/* <EmptyContent> */}
      {/*   <Button variant="outline" size="sm"> */}
      {/*     Cancel */}
      {/*   </Button> */}
      {/* </EmptyContent> */}
    </Empty>
  )
}
