import { Transport } from "@connectrpc/connect";
import { createQueryOptions } from "@connectrpc/connect-query";
import { Profile } from "@/gen/proto/fijoy/v1/profile_pb";
import {
  getAccountSnapshots,
  getOverallSnapshots,
} from "@/gen/proto/fijoy/v1/snapshot-SnapshotService_connectquery";
import { type Timestamp } from "@bufbuild/protobuf/wkt";

type getOverallSnapshotsProps = {
  fromDatehour: Timestamp;
  toDatehour: Timestamp;
  context: {
    transport: Transport;
    profile: Profile;
  };
};

export const getOverallSnapshotsQueryOptions = ({
  fromDatehour,
  toDatehour,
  context,
}: getOverallSnapshotsProps) => {
  return createQueryOptions(
    getOverallSnapshots,
    {
      fromDatehour,
      toDatehour,
    },
    {
      transport: context.transport,
    },
  );
};

type getAccountSnapshotsProps = {
  accountId: string;
  fromDatehour: Timestamp;
  toDatehour: Timestamp;
  context: {
    transport: Transport;
    profile: Profile;
  };
};

export const getAccountSnapshotsQueryOptions = ({
  accountId,
  fromDatehour,
  toDatehour,
  context,
}: getAccountSnapshotsProps) => {
  return createQueryOptions(
    getAccountSnapshots,
    {
      accountId,
      fromDatehour,
      toDatehour,
    },
    {
      transport: context.transport,
    },
  );
};
