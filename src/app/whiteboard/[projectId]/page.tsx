import Room from "@/app/components/Room";
import Live from "@/app/components/Live";
import Loading from "@/app/loading";

interface Params {
  projectId: string;
}

const WhiteBoard = ({ params }: { params: Params }) => {
  const { projectId } = params;

  return (
    <div>
      <Room roomId={projectId} fallback={<Loading />}>
        <Live />
      </Room>
    </div>
  );
}

export default WhiteBoard;
