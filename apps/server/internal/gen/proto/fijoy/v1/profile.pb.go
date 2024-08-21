// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.32.0
// 	protoc        (unknown)
// source: fijoy/v1/profile.proto

package fijoyv1

import (
	_ "buf.build/gen/go/bufbuild/protovalidate/protocolbuffers/go/buf/validate"
	protoreflect "google.golang.org/protobuf/reflect/protoreflect"
	protoimpl "google.golang.org/protobuf/runtime/protoimpl"
	emptypb "google.golang.org/protobuf/types/known/emptypb"
	timestamppb "google.golang.org/protobuf/types/known/timestamppb"
	reflect "reflect"
	sync "sync"
)

const (
	// Verify that this generated code is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(20 - protoimpl.MinVersion)
	// Verify that runtime/protoimpl is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(protoimpl.MaxVersion - 20)
)

type Profile struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Id         string                 `protobuf:"bytes,1,opt,name=id,proto3" json:"id,omitempty"`
	UserId     string                 `protobuf:"bytes,2,opt,name=user_id,json=userId,proto3" json:"user_id,omitempty"`
	Currencies []string               `protobuf:"bytes,3,rep,name=currencies,proto3" json:"currencies,omitempty"`
	Locale     string                 `protobuf:"bytes,4,opt,name=locale,proto3" json:"locale,omitempty"`
	CreatedAt  *timestamppb.Timestamp `protobuf:"bytes,5,opt,name=created_at,json=createdAt,proto3" json:"created_at,omitempty"`
}

func (x *Profile) Reset() {
	*x = Profile{}
	if protoimpl.UnsafeEnabled {
		mi := &file_fijoy_v1_profile_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Profile) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Profile) ProtoMessage() {}

func (x *Profile) ProtoReflect() protoreflect.Message {
	mi := &file_fijoy_v1_profile_proto_msgTypes[0]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Profile.ProtoReflect.Descriptor instead.
func (*Profile) Descriptor() ([]byte, []int) {
	return file_fijoy_v1_profile_proto_rawDescGZIP(), []int{0}
}

func (x *Profile) GetId() string {
	if x != nil {
		return x.Id
	}
	return ""
}

func (x *Profile) GetUserId() string {
	if x != nil {
		return x.UserId
	}
	return ""
}

func (x *Profile) GetCurrencies() []string {
	if x != nil {
		return x.Currencies
	}
	return nil
}

func (x *Profile) GetLocale() string {
	if x != nil {
		return x.Locale
	}
	return ""
}

func (x *Profile) GetCreatedAt() *timestamppb.Timestamp {
	if x != nil {
		return x.CreatedAt
	}
	return nil
}

type CreateProfileRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Currencies []string `protobuf:"bytes,1,rep,name=currencies,proto3" json:"currencies,omitempty"`
}

func (x *CreateProfileRequest) Reset() {
	*x = CreateProfileRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_fijoy_v1_profile_proto_msgTypes[1]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *CreateProfileRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*CreateProfileRequest) ProtoMessage() {}

func (x *CreateProfileRequest) ProtoReflect() protoreflect.Message {
	mi := &file_fijoy_v1_profile_proto_msgTypes[1]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use CreateProfileRequest.ProtoReflect.Descriptor instead.
func (*CreateProfileRequest) Descriptor() ([]byte, []int) {
	return file_fijoy_v1_profile_proto_rawDescGZIP(), []int{1}
}

func (x *CreateProfileRequest) GetCurrencies() []string {
	if x != nil {
		return x.Currencies
	}
	return nil
}

type UpdateCurrencyRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Currencies []string `protobuf:"bytes,2,rep,name=currencies,proto3" json:"currencies,omitempty"`
}

func (x *UpdateCurrencyRequest) Reset() {
	*x = UpdateCurrencyRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_fijoy_v1_profile_proto_msgTypes[2]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *UpdateCurrencyRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*UpdateCurrencyRequest) ProtoMessage() {}

func (x *UpdateCurrencyRequest) ProtoReflect() protoreflect.Message {
	mi := &file_fijoy_v1_profile_proto_msgTypes[2]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use UpdateCurrencyRequest.ProtoReflect.Descriptor instead.
func (*UpdateCurrencyRequest) Descriptor() ([]byte, []int) {
	return file_fijoy_v1_profile_proto_rawDescGZIP(), []int{2}
}

func (x *UpdateCurrencyRequest) GetCurrencies() []string {
	if x != nil {
		return x.Currencies
	}
	return nil
}

var File_fijoy_v1_profile_proto protoreflect.FileDescriptor

var file_fijoy_v1_profile_proto_rawDesc = []byte{
	0x0a, 0x16, 0x66, 0x69, 0x6a, 0x6f, 0x79, 0x2f, 0x76, 0x31, 0x2f, 0x70, 0x72, 0x6f, 0x66, 0x69,
	0x6c, 0x65, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x12, 0x08, 0x66, 0x69, 0x6a, 0x6f, 0x79, 0x2e,
	0x76, 0x31, 0x1a, 0x1b, 0x62, 0x75, 0x66, 0x2f, 0x76, 0x61, 0x6c, 0x69, 0x64, 0x61, 0x74, 0x65,
	0x2f, 0x76, 0x61, 0x6c, 0x69, 0x64, 0x61, 0x74, 0x65, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x1a,
	0x1b, 0x67, 0x6f, 0x6f, 0x67, 0x6c, 0x65, 0x2f, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x62, 0x75, 0x66,
	0x2f, 0x65, 0x6d, 0x70, 0x74, 0x79, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x1a, 0x1f, 0x67, 0x6f,
	0x6f, 0x67, 0x6c, 0x65, 0x2f, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x62, 0x75, 0x66, 0x2f, 0x74, 0x69,
	0x6d, 0x65, 0x73, 0x74, 0x61, 0x6d, 0x70, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x22, 0xd4, 0x01,
	0x0a, 0x07, 0x50, 0x72, 0x6f, 0x66, 0x69, 0x6c, 0x65, 0x12, 0x17, 0x0a, 0x02, 0x69, 0x64, 0x18,
	0x01, 0x20, 0x01, 0x28, 0x09, 0x42, 0x07, 0xba, 0x48, 0x04, 0x72, 0x02, 0x10, 0x01, 0x52, 0x02,
	0x69, 0x64, 0x12, 0x20, 0x0a, 0x07, 0x75, 0x73, 0x65, 0x72, 0x5f, 0x69, 0x64, 0x18, 0x02, 0x20,
	0x01, 0x28, 0x09, 0x42, 0x07, 0xba, 0x48, 0x04, 0x72, 0x02, 0x10, 0x01, 0x52, 0x06, 0x75, 0x73,
	0x65, 0x72, 0x49, 0x64, 0x12, 0x2a, 0x0a, 0x0a, 0x63, 0x75, 0x72, 0x72, 0x65, 0x6e, 0x63, 0x69,
	0x65, 0x73, 0x18, 0x03, 0x20, 0x03, 0x28, 0x09, 0x42, 0x0a, 0xba, 0x48, 0x07, 0x92, 0x01, 0x04,
	0x08, 0x01, 0x18, 0x01, 0x52, 0x0a, 0x63, 0x75, 0x72, 0x72, 0x65, 0x6e, 0x63, 0x69, 0x65, 0x73,
	0x12, 0x1f, 0x0a, 0x06, 0x6c, 0x6f, 0x63, 0x61, 0x6c, 0x65, 0x18, 0x04, 0x20, 0x01, 0x28, 0x09,
	0x42, 0x07, 0xba, 0x48, 0x04, 0x72, 0x02, 0x10, 0x01, 0x52, 0x06, 0x6c, 0x6f, 0x63, 0x61, 0x6c,
	0x65, 0x12, 0x41, 0x0a, 0x0a, 0x63, 0x72, 0x65, 0x61, 0x74, 0x65, 0x64, 0x5f, 0x61, 0x74, 0x18,
	0x05, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x1a, 0x2e, 0x67, 0x6f, 0x6f, 0x67, 0x6c, 0x65, 0x2e, 0x70,
	0x72, 0x6f, 0x74, 0x6f, 0x62, 0x75, 0x66, 0x2e, 0x54, 0x69, 0x6d, 0x65, 0x73, 0x74, 0x61, 0x6d,
	0x70, 0x42, 0x06, 0xba, 0x48, 0x03, 0xc8, 0x01, 0x01, 0x52, 0x09, 0x63, 0x72, 0x65, 0x61, 0x74,
	0x65, 0x64, 0x41, 0x74, 0x22, 0x42, 0x0a, 0x14, 0x43, 0x72, 0x65, 0x61, 0x74, 0x65, 0x50, 0x72,
	0x6f, 0x66, 0x69, 0x6c, 0x65, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x12, 0x2a, 0x0a, 0x0a,
	0x63, 0x75, 0x72, 0x72, 0x65, 0x6e, 0x63, 0x69, 0x65, 0x73, 0x18, 0x01, 0x20, 0x03, 0x28, 0x09,
	0x42, 0x0a, 0xba, 0x48, 0x07, 0x92, 0x01, 0x04, 0x08, 0x01, 0x18, 0x01, 0x52, 0x0a, 0x63, 0x75,
	0x72, 0x72, 0x65, 0x6e, 0x63, 0x69, 0x65, 0x73, 0x22, 0x43, 0x0a, 0x15, 0x55, 0x70, 0x64, 0x61,
	0x74, 0x65, 0x43, 0x75, 0x72, 0x72, 0x65, 0x6e, 0x63, 0x79, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73,
	0x74, 0x12, 0x2a, 0x0a, 0x0a, 0x63, 0x75, 0x72, 0x72, 0x65, 0x6e, 0x63, 0x69, 0x65, 0x73, 0x18,
	0x02, 0x20, 0x03, 0x28, 0x09, 0x42, 0x0a, 0xba, 0x48, 0x07, 0x92, 0x01, 0x04, 0x08, 0x01, 0x18,
	0x01, 0x52, 0x0a, 0x63, 0x75, 0x72, 0x72, 0x65, 0x6e, 0x63, 0x69, 0x65, 0x73, 0x32, 0x96, 0x02,
	0x0a, 0x0e, 0x50, 0x72, 0x6f, 0x66, 0x69, 0x6c, 0x65, 0x53, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65,
	0x12, 0x42, 0x0a, 0x0d, 0x43, 0x72, 0x65, 0x61, 0x74, 0x65, 0x50, 0x72, 0x6f, 0x66, 0x69, 0x6c,
	0x65, 0x12, 0x1e, 0x2e, 0x66, 0x69, 0x6a, 0x6f, 0x79, 0x2e, 0x76, 0x31, 0x2e, 0x43, 0x72, 0x65,
	0x61, 0x74, 0x65, 0x50, 0x72, 0x6f, 0x66, 0x69, 0x6c, 0x65, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73,
	0x74, 0x1a, 0x11, 0x2e, 0x66, 0x69, 0x6a, 0x6f, 0x79, 0x2e, 0x76, 0x31, 0x2e, 0x50, 0x72, 0x6f,
	0x66, 0x69, 0x6c, 0x65, 0x12, 0x3c, 0x0a, 0x0a, 0x47, 0x65, 0x74, 0x50, 0x72, 0x6f, 0x66, 0x69,
	0x6c, 0x65, 0x12, 0x16, 0x2e, 0x67, 0x6f, 0x6f, 0x67, 0x6c, 0x65, 0x2e, 0x70, 0x72, 0x6f, 0x74,
	0x6f, 0x62, 0x75, 0x66, 0x2e, 0x45, 0x6d, 0x70, 0x74, 0x79, 0x1a, 0x11, 0x2e, 0x66, 0x69, 0x6a,
	0x6f, 0x79, 0x2e, 0x76, 0x31, 0x2e, 0x50, 0x72, 0x6f, 0x66, 0x69, 0x6c, 0x65, 0x22, 0x03, 0x90,
	0x02, 0x01, 0x12, 0x44, 0x0a, 0x0e, 0x55, 0x70, 0x64, 0x61, 0x74, 0x65, 0x43, 0x75, 0x72, 0x72,
	0x65, 0x6e, 0x63, 0x79, 0x12, 0x1f, 0x2e, 0x66, 0x69, 0x6a, 0x6f, 0x79, 0x2e, 0x76, 0x31, 0x2e,
	0x55, 0x70, 0x64, 0x61, 0x74, 0x65, 0x43, 0x75, 0x72, 0x72, 0x65, 0x6e, 0x63, 0x79, 0x52, 0x65,
	0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x11, 0x2e, 0x66, 0x69, 0x6a, 0x6f, 0x79, 0x2e, 0x76, 0x31,
	0x2e, 0x50, 0x72, 0x6f, 0x66, 0x69, 0x6c, 0x65, 0x12, 0x3c, 0x0a, 0x0d, 0x44, 0x65, 0x6c, 0x65,
	0x74, 0x65, 0x50, 0x72, 0x6f, 0x66, 0x69, 0x6c, 0x65, 0x12, 0x16, 0x2e, 0x67, 0x6f, 0x6f, 0x67,
	0x6c, 0x65, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x62, 0x75, 0x66, 0x2e, 0x45, 0x6d, 0x70, 0x74,
	0x79, 0x1a, 0x11, 0x2e, 0x66, 0x69, 0x6a, 0x6f, 0x79, 0x2e, 0x76, 0x31, 0x2e, 0x50, 0x72, 0x6f,
	0x66, 0x69, 0x6c, 0x65, 0x22, 0x00, 0x42, 0x88, 0x01, 0x0a, 0x0c, 0x63, 0x6f, 0x6d, 0x2e, 0x66,
	0x69, 0x6a, 0x6f, 0x79, 0x2e, 0x76, 0x31, 0x42, 0x0c, 0x50, 0x72, 0x6f, 0x66, 0x69, 0x6c, 0x65,
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
	file_fijoy_v1_profile_proto_rawDescOnce sync.Once
	file_fijoy_v1_profile_proto_rawDescData = file_fijoy_v1_profile_proto_rawDesc
)

func file_fijoy_v1_profile_proto_rawDescGZIP() []byte {
	file_fijoy_v1_profile_proto_rawDescOnce.Do(func() {
		file_fijoy_v1_profile_proto_rawDescData = protoimpl.X.CompressGZIP(file_fijoy_v1_profile_proto_rawDescData)
	})
	return file_fijoy_v1_profile_proto_rawDescData
}

var file_fijoy_v1_profile_proto_msgTypes = make([]protoimpl.MessageInfo, 3)
var file_fijoy_v1_profile_proto_goTypes = []interface{}{
	(*Profile)(nil),               // 0: fijoy.v1.Profile
	(*CreateProfileRequest)(nil),  // 1: fijoy.v1.CreateProfileRequest
	(*UpdateCurrencyRequest)(nil), // 2: fijoy.v1.UpdateCurrencyRequest
	(*timestamppb.Timestamp)(nil), // 3: google.protobuf.Timestamp
	(*emptypb.Empty)(nil),         // 4: google.protobuf.Empty
}
var file_fijoy_v1_profile_proto_depIdxs = []int32{
	3, // 0: fijoy.v1.Profile.created_at:type_name -> google.protobuf.Timestamp
	1, // 1: fijoy.v1.ProfileService.CreateProfile:input_type -> fijoy.v1.CreateProfileRequest
	4, // 2: fijoy.v1.ProfileService.GetProfile:input_type -> google.protobuf.Empty
	2, // 3: fijoy.v1.ProfileService.UpdateCurrency:input_type -> fijoy.v1.UpdateCurrencyRequest
	4, // 4: fijoy.v1.ProfileService.DeleteProfile:input_type -> google.protobuf.Empty
	0, // 5: fijoy.v1.ProfileService.CreateProfile:output_type -> fijoy.v1.Profile
	0, // 6: fijoy.v1.ProfileService.GetProfile:output_type -> fijoy.v1.Profile
	0, // 7: fijoy.v1.ProfileService.UpdateCurrency:output_type -> fijoy.v1.Profile
	0, // 8: fijoy.v1.ProfileService.DeleteProfile:output_type -> fijoy.v1.Profile
	5, // [5:9] is the sub-list for method output_type
	1, // [1:5] is the sub-list for method input_type
	1, // [1:1] is the sub-list for extension type_name
	1, // [1:1] is the sub-list for extension extendee
	0, // [0:1] is the sub-list for field type_name
}

func init() { file_fijoy_v1_profile_proto_init() }
func file_fijoy_v1_profile_proto_init() {
	if File_fijoy_v1_profile_proto != nil {
		return
	}
	if !protoimpl.UnsafeEnabled {
		file_fijoy_v1_profile_proto_msgTypes[0].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*Profile); i {
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
		file_fijoy_v1_profile_proto_msgTypes[1].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*CreateProfileRequest); i {
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
		file_fijoy_v1_profile_proto_msgTypes[2].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*UpdateCurrencyRequest); i {
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
			RawDescriptor: file_fijoy_v1_profile_proto_rawDesc,
			NumEnums:      0,
			NumMessages:   3,
			NumExtensions: 0,
			NumServices:   1,
		},
		GoTypes:           file_fijoy_v1_profile_proto_goTypes,
		DependencyIndexes: file_fijoy_v1_profile_proto_depIdxs,
		MessageInfos:      file_fijoy_v1_profile_proto_msgTypes,
	}.Build()
	File_fijoy_v1_profile_proto = out.File
	file_fijoy_v1_profile_proto_rawDesc = nil
	file_fijoy_v1_profile_proto_goTypes = nil
	file_fijoy_v1_profile_proto_depIdxs = nil
}
