// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.34.2
// 	protoc        (unknown)
// source: fijoy/v1/snapshot.proto

package fijoyv1

import (
	_ "buf.build/gen/go/bufbuild/protovalidate/protocolbuffers/go/buf/validate"
	_type "fijoy/internal/gen/proto/google/type"
	protoreflect "google.golang.org/protobuf/reflect/protoreflect"
	protoimpl "google.golang.org/protobuf/runtime/protoimpl"
	_ "google.golang.org/protobuf/types/known/emptypb"
	reflect "reflect"
	sync "sync"
)

const (
	// Verify that this generated code is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(20 - protoimpl.MinVersion)
	// Verify that runtime/protoimpl is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(protoimpl.MaxVersion - 20)
)

type Snapshot struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Id         string      `protobuf:"bytes,1,opt,name=id,proto3" json:"id,omitempty"`
	ProfileId  string      `protobuf:"bytes,2,opt,name=profile_id,json=profileId,proto3" json:"profile_id,omitempty"`
	Date       *_type.Date `protobuf:"bytes,3,opt,name=date,proto3" json:"date,omitempty"`
	Liquidity  string      `protobuf:"bytes,4,opt,name=liquidity,proto3" json:"liquidity,omitempty"`
	Investment string      `protobuf:"bytes,5,opt,name=investment,proto3" json:"investment,omitempty"`
	Property   string      `protobuf:"bytes,6,opt,name=property,proto3" json:"property,omitempty"`
	Receivable string      `protobuf:"bytes,7,opt,name=receivable,proto3" json:"receivable,omitempty"`
	Liability  string      `protobuf:"bytes,8,opt,name=liability,proto3" json:"liability,omitempty"`
}

func (x *Snapshot) Reset() {
	*x = Snapshot{}
	if protoimpl.UnsafeEnabled {
		mi := &file_fijoy_v1_snapshot_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Snapshot) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Snapshot) ProtoMessage() {}

func (x *Snapshot) ProtoReflect() protoreflect.Message {
	mi := &file_fijoy_v1_snapshot_proto_msgTypes[0]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Snapshot.ProtoReflect.Descriptor instead.
func (*Snapshot) Descriptor() ([]byte, []int) {
	return file_fijoy_v1_snapshot_proto_rawDescGZIP(), []int{0}
}

func (x *Snapshot) GetId() string {
	if x != nil {
		return x.Id
	}
	return ""
}

func (x *Snapshot) GetProfileId() string {
	if x != nil {
		return x.ProfileId
	}
	return ""
}

func (x *Snapshot) GetDate() *_type.Date {
	if x != nil {
		return x.Date
	}
	return nil
}

func (x *Snapshot) GetLiquidity() string {
	if x != nil {
		return x.Liquidity
	}
	return ""
}

func (x *Snapshot) GetInvestment() string {
	if x != nil {
		return x.Investment
	}
	return ""
}

func (x *Snapshot) GetProperty() string {
	if x != nil {
		return x.Property
	}
	return ""
}

func (x *Snapshot) GetReceivable() string {
	if x != nil {
		return x.Receivable
	}
	return ""
}

func (x *Snapshot) GetLiability() string {
	if x != nil {
		return x.Liability
	}
	return ""
}

type Snapshots struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Snapshots []*Snapshot `protobuf:"bytes,1,rep,name=snapshots,proto3" json:"snapshots,omitempty"`
}

func (x *Snapshots) Reset() {
	*x = Snapshots{}
	if protoimpl.UnsafeEnabled {
		mi := &file_fijoy_v1_snapshot_proto_msgTypes[1]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Snapshots) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Snapshots) ProtoMessage() {}

func (x *Snapshots) ProtoReflect() protoreflect.Message {
	mi := &file_fijoy_v1_snapshot_proto_msgTypes[1]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Snapshots.ProtoReflect.Descriptor instead.
func (*Snapshots) Descriptor() ([]byte, []int) {
	return file_fijoy_v1_snapshot_proto_rawDescGZIP(), []int{1}
}

func (x *Snapshots) GetSnapshots() []*Snapshot {
	if x != nil {
		return x.Snapshots
	}
	return nil
}

type GetSnapshotRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Date *_type.Date `protobuf:"bytes,1,opt,name=date,proto3" json:"date,omitempty"`
}

func (x *GetSnapshotRequest) Reset() {
	*x = GetSnapshotRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_fijoy_v1_snapshot_proto_msgTypes[2]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *GetSnapshotRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*GetSnapshotRequest) ProtoMessage() {}

func (x *GetSnapshotRequest) ProtoReflect() protoreflect.Message {
	mi := &file_fijoy_v1_snapshot_proto_msgTypes[2]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use GetSnapshotRequest.ProtoReflect.Descriptor instead.
func (*GetSnapshotRequest) Descriptor() ([]byte, []int) {
	return file_fijoy_v1_snapshot_proto_rawDescGZIP(), []int{2}
}

func (x *GetSnapshotRequest) GetDate() *_type.Date {
	if x != nil {
		return x.Date
	}
	return nil
}

type GetSnapshotsRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	FromDate *_type.Date `protobuf:"bytes,1,opt,name=from_date,json=fromDate,proto3" json:"from_date,omitempty"`
	// inclusive
	ToDate *_type.Date `protobuf:"bytes,2,opt,name=to_date,json=toDate,proto3" json:"to_date,omitempty"`
}

func (x *GetSnapshotsRequest) Reset() {
	*x = GetSnapshotsRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_fijoy_v1_snapshot_proto_msgTypes[3]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *GetSnapshotsRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*GetSnapshotsRequest) ProtoMessage() {}

func (x *GetSnapshotsRequest) ProtoReflect() protoreflect.Message {
	mi := &file_fijoy_v1_snapshot_proto_msgTypes[3]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use GetSnapshotsRequest.ProtoReflect.Descriptor instead.
func (*GetSnapshotsRequest) Descriptor() ([]byte, []int) {
	return file_fijoy_v1_snapshot_proto_rawDescGZIP(), []int{3}
}

func (x *GetSnapshotsRequest) GetFromDate() *_type.Date {
	if x != nil {
		return x.FromDate
	}
	return nil
}

func (x *GetSnapshotsRequest) GetToDate() *_type.Date {
	if x != nil {
		return x.ToDate
	}
	return nil
}

var File_fijoy_v1_snapshot_proto protoreflect.FileDescriptor

var file_fijoy_v1_snapshot_proto_rawDesc = []byte{
	0x0a, 0x17, 0x66, 0x69, 0x6a, 0x6f, 0x79, 0x2f, 0x76, 0x31, 0x2f, 0x73, 0x6e, 0x61, 0x70, 0x73,
	0x68, 0x6f, 0x74, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x12, 0x08, 0x66, 0x69, 0x6a, 0x6f, 0x79,
	0x2e, 0x76, 0x31, 0x1a, 0x1b, 0x62, 0x75, 0x66, 0x2f, 0x76, 0x61, 0x6c, 0x69, 0x64, 0x61, 0x74,
	0x65, 0x2f, 0x76, 0x61, 0x6c, 0x69, 0x64, 0x61, 0x74, 0x65, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f,
	0x1a, 0x1b, 0x67, 0x6f, 0x6f, 0x67, 0x6c, 0x65, 0x2f, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x62, 0x75,
	0x66, 0x2f, 0x65, 0x6d, 0x70, 0x74, 0x79, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x1a, 0x16, 0x67,
	0x6f, 0x6f, 0x67, 0x6c, 0x65, 0x2f, 0x74, 0x79, 0x70, 0x65, 0x2f, 0x64, 0x61, 0x74, 0x65, 0x2e,
	0x70, 0x72, 0x6f, 0x74, 0x6f, 0x22, 0xba, 0x02, 0x0a, 0x08, 0x53, 0x6e, 0x61, 0x70, 0x73, 0x68,
	0x6f, 0x74, 0x12, 0x17, 0x0a, 0x02, 0x69, 0x64, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x42, 0x07,
	0xba, 0x48, 0x04, 0x72, 0x02, 0x10, 0x01, 0x52, 0x02, 0x69, 0x64, 0x12, 0x26, 0x0a, 0x0a, 0x70,
	0x72, 0x6f, 0x66, 0x69, 0x6c, 0x65, 0x5f, 0x69, 0x64, 0x18, 0x02, 0x20, 0x01, 0x28, 0x09, 0x42,
	0x07, 0xba, 0x48, 0x04, 0x72, 0x02, 0x10, 0x01, 0x52, 0x09, 0x70, 0x72, 0x6f, 0x66, 0x69, 0x6c,
	0x65, 0x49, 0x64, 0x12, 0x2d, 0x0a, 0x04, 0x64, 0x61, 0x74, 0x65, 0x18, 0x03, 0x20, 0x01, 0x28,
	0x0b, 0x32, 0x11, 0x2e, 0x67, 0x6f, 0x6f, 0x67, 0x6c, 0x65, 0x2e, 0x74, 0x79, 0x70, 0x65, 0x2e,
	0x44, 0x61, 0x74, 0x65, 0x42, 0x06, 0xba, 0x48, 0x03, 0xc8, 0x01, 0x01, 0x52, 0x04, 0x64, 0x61,
	0x74, 0x65, 0x12, 0x24, 0x0a, 0x09, 0x6c, 0x69, 0x71, 0x75, 0x69, 0x64, 0x69, 0x74, 0x79, 0x18,
	0x04, 0x20, 0x01, 0x28, 0x09, 0x42, 0x06, 0xba, 0x48, 0x03, 0xc8, 0x01, 0x01, 0x52, 0x09, 0x6c,
	0x69, 0x71, 0x75, 0x69, 0x64, 0x69, 0x74, 0x79, 0x12, 0x26, 0x0a, 0x0a, 0x69, 0x6e, 0x76, 0x65,
	0x73, 0x74, 0x6d, 0x65, 0x6e, 0x74, 0x18, 0x05, 0x20, 0x01, 0x28, 0x09, 0x42, 0x06, 0xba, 0x48,
	0x03, 0xc8, 0x01, 0x01, 0x52, 0x0a, 0x69, 0x6e, 0x76, 0x65, 0x73, 0x74, 0x6d, 0x65, 0x6e, 0x74,
	0x12, 0x22, 0x0a, 0x08, 0x70, 0x72, 0x6f, 0x70, 0x65, 0x72, 0x74, 0x79, 0x18, 0x06, 0x20, 0x01,
	0x28, 0x09, 0x42, 0x06, 0xba, 0x48, 0x03, 0xc8, 0x01, 0x01, 0x52, 0x08, 0x70, 0x72, 0x6f, 0x70,
	0x65, 0x72, 0x74, 0x79, 0x12, 0x26, 0x0a, 0x0a, 0x72, 0x65, 0x63, 0x65, 0x69, 0x76, 0x61, 0x62,
	0x6c, 0x65, 0x18, 0x07, 0x20, 0x01, 0x28, 0x09, 0x42, 0x06, 0xba, 0x48, 0x03, 0xc8, 0x01, 0x01,
	0x52, 0x0a, 0x72, 0x65, 0x63, 0x65, 0x69, 0x76, 0x61, 0x62, 0x6c, 0x65, 0x12, 0x24, 0x0a, 0x09,
	0x6c, 0x69, 0x61, 0x62, 0x69, 0x6c, 0x69, 0x74, 0x79, 0x18, 0x08, 0x20, 0x01, 0x28, 0x09, 0x42,
	0x06, 0xba, 0x48, 0x03, 0xc8, 0x01, 0x01, 0x52, 0x09, 0x6c, 0x69, 0x61, 0x62, 0x69, 0x6c, 0x69,
	0x74, 0x79, 0x22, 0x45, 0x0a, 0x09, 0x53, 0x6e, 0x61, 0x70, 0x73, 0x68, 0x6f, 0x74, 0x73, 0x12,
	0x38, 0x0a, 0x09, 0x73, 0x6e, 0x61, 0x70, 0x73, 0x68, 0x6f, 0x74, 0x73, 0x18, 0x01, 0x20, 0x03,
	0x28, 0x0b, 0x32, 0x12, 0x2e, 0x66, 0x69, 0x6a, 0x6f, 0x79, 0x2e, 0x76, 0x31, 0x2e, 0x53, 0x6e,
	0x61, 0x70, 0x73, 0x68, 0x6f, 0x74, 0x42, 0x06, 0xba, 0x48, 0x03, 0xc8, 0x01, 0x01, 0x52, 0x09,
	0x73, 0x6e, 0x61, 0x70, 0x73, 0x68, 0x6f, 0x74, 0x73, 0x22, 0x43, 0x0a, 0x12, 0x47, 0x65, 0x74,
	0x53, 0x6e, 0x61, 0x70, 0x73, 0x68, 0x6f, 0x74, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x12,
	0x2d, 0x0a, 0x04, 0x64, 0x61, 0x74, 0x65, 0x18, 0x01, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x11, 0x2e,
	0x67, 0x6f, 0x6f, 0x67, 0x6c, 0x65, 0x2e, 0x74, 0x79, 0x70, 0x65, 0x2e, 0x44, 0x61, 0x74, 0x65,
	0x42, 0x06, 0xba, 0x48, 0x03, 0xc8, 0x01, 0x01, 0x52, 0x04, 0x64, 0x61, 0x74, 0x65, 0x22, 0x81,
	0x01, 0x0a, 0x13, 0x47, 0x65, 0x74, 0x53, 0x6e, 0x61, 0x70, 0x73, 0x68, 0x6f, 0x74, 0x73, 0x52,
	0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x12, 0x36, 0x0a, 0x09, 0x66, 0x72, 0x6f, 0x6d, 0x5f, 0x64,
	0x61, 0x74, 0x65, 0x18, 0x01, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x11, 0x2e, 0x67, 0x6f, 0x6f, 0x67,
	0x6c, 0x65, 0x2e, 0x74, 0x79, 0x70, 0x65, 0x2e, 0x44, 0x61, 0x74, 0x65, 0x42, 0x06, 0xba, 0x48,
	0x03, 0xc8, 0x01, 0x01, 0x52, 0x08, 0x66, 0x72, 0x6f, 0x6d, 0x44, 0x61, 0x74, 0x65, 0x12, 0x32,
	0x0a, 0x07, 0x74, 0x6f, 0x5f, 0x64, 0x61, 0x74, 0x65, 0x18, 0x02, 0x20, 0x01, 0x28, 0x0b, 0x32,
	0x11, 0x2e, 0x67, 0x6f, 0x6f, 0x67, 0x6c, 0x65, 0x2e, 0x74, 0x79, 0x70, 0x65, 0x2e, 0x44, 0x61,
	0x74, 0x65, 0x42, 0x06, 0xba, 0x48, 0x03, 0xc8, 0x01, 0x01, 0x52, 0x06, 0x74, 0x6f, 0x44, 0x61,
	0x74, 0x65, 0x32, 0xa0, 0x01, 0x0a, 0x0f, 0x53, 0x6e, 0x61, 0x70, 0x73, 0x68, 0x6f, 0x74, 0x53,
	0x65, 0x72, 0x76, 0x69, 0x63, 0x65, 0x12, 0x44, 0x0a, 0x0b, 0x47, 0x65, 0x74, 0x53, 0x6e, 0x61,
	0x70, 0x73, 0x68, 0x6f, 0x74, 0x12, 0x1c, 0x2e, 0x66, 0x69, 0x6a, 0x6f, 0x79, 0x2e, 0x76, 0x31,
	0x2e, 0x47, 0x65, 0x74, 0x53, 0x6e, 0x61, 0x70, 0x73, 0x68, 0x6f, 0x74, 0x52, 0x65, 0x71, 0x75,
	0x65, 0x73, 0x74, 0x1a, 0x12, 0x2e, 0x66, 0x69, 0x6a, 0x6f, 0x79, 0x2e, 0x76, 0x31, 0x2e, 0x53,
	0x6e, 0x61, 0x70, 0x73, 0x68, 0x6f, 0x74, 0x22, 0x03, 0x90, 0x02, 0x01, 0x12, 0x47, 0x0a, 0x0c,
	0x47, 0x65, 0x74, 0x53, 0x6e, 0x61, 0x70, 0x73, 0x68, 0x6f, 0x74, 0x73, 0x12, 0x1d, 0x2e, 0x66,
	0x69, 0x6a, 0x6f, 0x79, 0x2e, 0x76, 0x31, 0x2e, 0x47, 0x65, 0x74, 0x53, 0x6e, 0x61, 0x70, 0x73,
	0x68, 0x6f, 0x74, 0x73, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x13, 0x2e, 0x66, 0x69,
	0x6a, 0x6f, 0x79, 0x2e, 0x76, 0x31, 0x2e, 0x53, 0x6e, 0x61, 0x70, 0x73, 0x68, 0x6f, 0x74, 0x73,
	0x22, 0x03, 0x90, 0x02, 0x01, 0x42, 0x89, 0x01, 0x0a, 0x0c, 0x63, 0x6f, 0x6d, 0x2e, 0x66, 0x69,
	0x6a, 0x6f, 0x79, 0x2e, 0x76, 0x31, 0x42, 0x0d, 0x53, 0x6e, 0x61, 0x70, 0x73, 0x68, 0x6f, 0x74,
	0x50, 0x72, 0x6f, 0x74, 0x6f, 0x50, 0x01, 0x5a, 0x29, 0x66, 0x69, 0x6a, 0x6f, 0x79, 0x2f, 0x69,
	0x6e, 0x74, 0x65, 0x72, 0x6e, 0x61, 0x6c, 0x2f, 0x67, 0x65, 0x6e, 0x2f, 0x70, 0x72, 0x6f, 0x74,
	0x6f, 0x2f, 0x66, 0x69, 0x6a, 0x6f, 0x79, 0x2f, 0x76, 0x31, 0x3b, 0x66, 0x69, 0x6a, 0x6f, 0x79,
	0x76, 0x31, 0xa2, 0x02, 0x03, 0x46, 0x58, 0x58, 0xaa, 0x02, 0x08, 0x46, 0x69, 0x6a, 0x6f, 0x79,
	0x2e, 0x56, 0x31, 0xca, 0x02, 0x08, 0x46, 0x69, 0x6a, 0x6f, 0x79, 0x5c, 0x56, 0x31, 0xe2, 0x02,
	0x14, 0x46, 0x69, 0x6a, 0x6f, 0x79, 0x5c, 0x56, 0x31, 0x5c, 0x47, 0x50, 0x42, 0x4d, 0x65, 0x74,
	0x61, 0x64, 0x61, 0x74, 0x61, 0xea, 0x02, 0x09, 0x46, 0x69, 0x6a, 0x6f, 0x79, 0x3a, 0x3a, 0x56,
	0x31, 0x62, 0x06, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x33,
}

var (
	file_fijoy_v1_snapshot_proto_rawDescOnce sync.Once
	file_fijoy_v1_snapshot_proto_rawDescData = file_fijoy_v1_snapshot_proto_rawDesc
)

func file_fijoy_v1_snapshot_proto_rawDescGZIP() []byte {
	file_fijoy_v1_snapshot_proto_rawDescOnce.Do(func() {
		file_fijoy_v1_snapshot_proto_rawDescData = protoimpl.X.CompressGZIP(file_fijoy_v1_snapshot_proto_rawDescData)
	})
	return file_fijoy_v1_snapshot_proto_rawDescData
}

var file_fijoy_v1_snapshot_proto_msgTypes = make([]protoimpl.MessageInfo, 4)
var file_fijoy_v1_snapshot_proto_goTypes = []any{
	(*Snapshot)(nil),            // 0: fijoy.v1.Snapshot
	(*Snapshots)(nil),           // 1: fijoy.v1.Snapshots
	(*GetSnapshotRequest)(nil),  // 2: fijoy.v1.GetSnapshotRequest
	(*GetSnapshotsRequest)(nil), // 3: fijoy.v1.GetSnapshotsRequest
	(*_type.Date)(nil),          // 4: google.type.Date
}
var file_fijoy_v1_snapshot_proto_depIdxs = []int32{
	4, // 0: fijoy.v1.Snapshot.date:type_name -> google.type.Date
	0, // 1: fijoy.v1.Snapshots.snapshots:type_name -> fijoy.v1.Snapshot
	4, // 2: fijoy.v1.GetSnapshotRequest.date:type_name -> google.type.Date
	4, // 3: fijoy.v1.GetSnapshotsRequest.from_date:type_name -> google.type.Date
	4, // 4: fijoy.v1.GetSnapshotsRequest.to_date:type_name -> google.type.Date
	2, // 5: fijoy.v1.SnapshotService.GetSnapshot:input_type -> fijoy.v1.GetSnapshotRequest
	3, // 6: fijoy.v1.SnapshotService.GetSnapshots:input_type -> fijoy.v1.GetSnapshotsRequest
	0, // 7: fijoy.v1.SnapshotService.GetSnapshot:output_type -> fijoy.v1.Snapshot
	1, // 8: fijoy.v1.SnapshotService.GetSnapshots:output_type -> fijoy.v1.Snapshots
	7, // [7:9] is the sub-list for method output_type
	5, // [5:7] is the sub-list for method input_type
	5, // [5:5] is the sub-list for extension type_name
	5, // [5:5] is the sub-list for extension extendee
	0, // [0:5] is the sub-list for field type_name
}

func init() { file_fijoy_v1_snapshot_proto_init() }
func file_fijoy_v1_snapshot_proto_init() {
	if File_fijoy_v1_snapshot_proto != nil {
		return
	}
	if !protoimpl.UnsafeEnabled {
		file_fijoy_v1_snapshot_proto_msgTypes[0].Exporter = func(v any, i int) any {
			switch v := v.(*Snapshot); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_fijoy_v1_snapshot_proto_msgTypes[1].Exporter = func(v any, i int) any {
			switch v := v.(*Snapshots); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_fijoy_v1_snapshot_proto_msgTypes[2].Exporter = func(v any, i int) any {
			switch v := v.(*GetSnapshotRequest); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_fijoy_v1_snapshot_proto_msgTypes[3].Exporter = func(v any, i int) any {
			switch v := v.(*GetSnapshotsRequest); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
	}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: file_fijoy_v1_snapshot_proto_rawDesc,
			NumEnums:      0,
			NumMessages:   4,
			NumExtensions: 0,
			NumServices:   1,
		},
		GoTypes:           file_fijoy_v1_snapshot_proto_goTypes,
		DependencyIndexes: file_fijoy_v1_snapshot_proto_depIdxs,
		MessageInfos:      file_fijoy_v1_snapshot_proto_msgTypes,
	}.Build()
	File_fijoy_v1_snapshot_proto = out.File
	file_fijoy_v1_snapshot_proto_rawDesc = nil
	file_fijoy_v1_snapshot_proto_goTypes = nil
	file_fijoy_v1_snapshot_proto_depIdxs = nil
}