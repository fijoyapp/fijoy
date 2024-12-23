// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.32.0
// 	protoc        (unknown)
// source: fijoy/v1/currency.proto

package fijoyv1

import (
	_ "buf.build/gen/go/bufbuild/protovalidate/protocolbuffers/go/buf/validate"
	protoreflect "google.golang.org/protobuf/reflect/protoreflect"
	protoimpl "google.golang.org/protobuf/runtime/protoimpl"
	emptypb "google.golang.org/protobuf/types/known/emptypb"
	_ "google.golang.org/protobuf/types/known/timestamppb"
	reflect "reflect"
	sync "sync"
)

const (
	// Verify that this generated code is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(20 - protoimpl.MinVersion)
	// Verify that runtime/protoimpl is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(protoimpl.MaxVersion - 20)
)

type Currency struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Code   string `protobuf:"bytes,1,opt,name=code,proto3" json:"code,omitempty"`
	Locale string `protobuf:"bytes,2,opt,name=locale,proto3" json:"locale,omitempty"`
}

func (x *Currency) Reset() {
	*x = Currency{}
	if protoimpl.UnsafeEnabled {
		mi := &file_fijoy_v1_currency_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Currency) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Currency) ProtoMessage() {}

func (x *Currency) ProtoReflect() protoreflect.Message {
	mi := &file_fijoy_v1_currency_proto_msgTypes[0]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Currency.ProtoReflect.Descriptor instead.
func (*Currency) Descriptor() ([]byte, []int) {
	return file_fijoy_v1_currency_proto_rawDescGZIP(), []int{0}
}

func (x *Currency) GetCode() string {
	if x != nil {
		return x.Code
	}
	return ""
}

func (x *Currency) GetLocale() string {
	if x != nil {
		return x.Locale
	}
	return ""
}

type CurrencyList struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Items []*Currency `protobuf:"bytes,1,rep,name=items,proto3" json:"items,omitempty"`
}

func (x *CurrencyList) Reset() {
	*x = CurrencyList{}
	if protoimpl.UnsafeEnabled {
		mi := &file_fijoy_v1_currency_proto_msgTypes[1]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *CurrencyList) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*CurrencyList) ProtoMessage() {}

func (x *CurrencyList) ProtoReflect() protoreflect.Message {
	mi := &file_fijoy_v1_currency_proto_msgTypes[1]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use CurrencyList.ProtoReflect.Descriptor instead.
func (*CurrencyList) Descriptor() ([]byte, []int) {
	return file_fijoy_v1_currency_proto_rawDescGZIP(), []int{1}
}

func (x *CurrencyList) GetItems() []*Currency {
	if x != nil {
		return x.Items
	}
	return nil
}

var File_fijoy_v1_currency_proto protoreflect.FileDescriptor

var file_fijoy_v1_currency_proto_rawDesc = []byte{
	0x0a, 0x17, 0x66, 0x69, 0x6a, 0x6f, 0x79, 0x2f, 0x76, 0x31, 0x2f, 0x63, 0x75, 0x72, 0x72, 0x65,
	0x6e, 0x63, 0x79, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x12, 0x08, 0x66, 0x69, 0x6a, 0x6f, 0x79,
	0x2e, 0x76, 0x31, 0x1a, 0x1b, 0x62, 0x75, 0x66, 0x2f, 0x76, 0x61, 0x6c, 0x69, 0x64, 0x61, 0x74,
	0x65, 0x2f, 0x76, 0x61, 0x6c, 0x69, 0x64, 0x61, 0x74, 0x65, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f,
	0x1a, 0x1b, 0x67, 0x6f, 0x6f, 0x67, 0x6c, 0x65, 0x2f, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x62, 0x75,
	0x66, 0x2f, 0x65, 0x6d, 0x70, 0x74, 0x79, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x1a, 0x1f, 0x67,
	0x6f, 0x6f, 0x67, 0x6c, 0x65, 0x2f, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x62, 0x75, 0x66, 0x2f, 0x74,
	0x69, 0x6d, 0x65, 0x73, 0x74, 0x61, 0x6d, 0x70, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x22, 0x48,
	0x0a, 0x08, 0x43, 0x75, 0x72, 0x72, 0x65, 0x6e, 0x63, 0x79, 0x12, 0x1b, 0x0a, 0x04, 0x63, 0x6f,
	0x64, 0x65, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x42, 0x07, 0xba, 0x48, 0x04, 0x72, 0x02, 0x10,
	0x01, 0x52, 0x04, 0x63, 0x6f, 0x64, 0x65, 0x12, 0x1f, 0x0a, 0x06, 0x6c, 0x6f, 0x63, 0x61, 0x6c,
	0x65, 0x18, 0x02, 0x20, 0x01, 0x28, 0x09, 0x42, 0x07, 0xba, 0x48, 0x04, 0x72, 0x02, 0x10, 0x01,
	0x52, 0x06, 0x6c, 0x6f, 0x63, 0x61, 0x6c, 0x65, 0x22, 0x40, 0x0a, 0x0c, 0x43, 0x75, 0x72, 0x72,
	0x65, 0x6e, 0x63, 0x79, 0x4c, 0x69, 0x73, 0x74, 0x12, 0x30, 0x0a, 0x05, 0x69, 0x74, 0x65, 0x6d,
	0x73, 0x18, 0x01, 0x20, 0x03, 0x28, 0x0b, 0x32, 0x12, 0x2e, 0x66, 0x69, 0x6a, 0x6f, 0x79, 0x2e,
	0x76, 0x31, 0x2e, 0x43, 0x75, 0x72, 0x72, 0x65, 0x6e, 0x63, 0x79, 0x42, 0x06, 0xba, 0x48, 0x03,
	0xc8, 0x01, 0x01, 0x52, 0x05, 0x69, 0x74, 0x65, 0x6d, 0x73, 0x32, 0x57, 0x0a, 0x0f, 0x43, 0x75,
	0x72, 0x72, 0x65, 0x6e, 0x63, 0x79, 0x53, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65, 0x12, 0x44, 0x0a,
	0x0d, 0x47, 0x65, 0x74, 0x43, 0x75, 0x72, 0x72, 0x65, 0x6e, 0x63, 0x69, 0x65, 0x73, 0x12, 0x16,
	0x2e, 0x67, 0x6f, 0x6f, 0x67, 0x6c, 0x65, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x62, 0x75, 0x66,
	0x2e, 0x45, 0x6d, 0x70, 0x74, 0x79, 0x1a, 0x16, 0x2e, 0x66, 0x69, 0x6a, 0x6f, 0x79, 0x2e, 0x76,
	0x31, 0x2e, 0x43, 0x75, 0x72, 0x72, 0x65, 0x6e, 0x63, 0x79, 0x4c, 0x69, 0x73, 0x74, 0x22, 0x03,
	0x90, 0x02, 0x01, 0x42, 0x7c, 0x0a, 0x0c, 0x63, 0x6f, 0x6d, 0x2e, 0x66, 0x69, 0x6a, 0x6f, 0x79,
	0x2e, 0x76, 0x31, 0x42, 0x0d, 0x43, 0x75, 0x72, 0x72, 0x65, 0x6e, 0x63, 0x79, 0x50, 0x72, 0x6f,
	0x74, 0x6f, 0x50, 0x01, 0x5a, 0x1c, 0x66, 0x69, 0x6a, 0x6f, 0x79, 0x2f, 0x70, 0x72, 0x6f, 0x74,
	0x6f, 0x2f, 0x66, 0x69, 0x6a, 0x6f, 0x79, 0x2f, 0x76, 0x31, 0x3b, 0x66, 0x69, 0x6a, 0x6f, 0x79,
	0x76, 0x31, 0xa2, 0x02, 0x03, 0x46, 0x58, 0x58, 0xaa, 0x02, 0x08, 0x46, 0x69, 0x6a, 0x6f, 0x79,
	0x2e, 0x56, 0x31, 0xca, 0x02, 0x08, 0x46, 0x69, 0x6a, 0x6f, 0x79, 0x5c, 0x56, 0x31, 0xe2, 0x02,
	0x14, 0x46, 0x69, 0x6a, 0x6f, 0x79, 0x5c, 0x56, 0x31, 0x5c, 0x47, 0x50, 0x42, 0x4d, 0x65, 0x74,
	0x61, 0x64, 0x61, 0x74, 0x61, 0xea, 0x02, 0x09, 0x46, 0x69, 0x6a, 0x6f, 0x79, 0x3a, 0x3a, 0x56,
	0x31, 0x62, 0x06, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x33,
}

var (
	file_fijoy_v1_currency_proto_rawDescOnce sync.Once
	file_fijoy_v1_currency_proto_rawDescData = file_fijoy_v1_currency_proto_rawDesc
)

func file_fijoy_v1_currency_proto_rawDescGZIP() []byte {
	file_fijoy_v1_currency_proto_rawDescOnce.Do(func() {
		file_fijoy_v1_currency_proto_rawDescData = protoimpl.X.CompressGZIP(file_fijoy_v1_currency_proto_rawDescData)
	})
	return file_fijoy_v1_currency_proto_rawDescData
}

var file_fijoy_v1_currency_proto_msgTypes = make([]protoimpl.MessageInfo, 2)
var file_fijoy_v1_currency_proto_goTypes = []interface{}{
	(*Currency)(nil),      // 0: fijoy.v1.Currency
	(*CurrencyList)(nil),  // 1: fijoy.v1.CurrencyList
	(*emptypb.Empty)(nil), // 2: google.protobuf.Empty
}
var file_fijoy_v1_currency_proto_depIdxs = []int32{
	0, // 0: fijoy.v1.CurrencyList.items:type_name -> fijoy.v1.Currency
	2, // 1: fijoy.v1.CurrencyService.GetCurrencies:input_type -> google.protobuf.Empty
	1, // 2: fijoy.v1.CurrencyService.GetCurrencies:output_type -> fijoy.v1.CurrencyList
	2, // [2:3] is the sub-list for method output_type
	1, // [1:2] is the sub-list for method input_type
	1, // [1:1] is the sub-list for extension type_name
	1, // [1:1] is the sub-list for extension extendee
	0, // [0:1] is the sub-list for field type_name
}

func init() { file_fijoy_v1_currency_proto_init() }
func file_fijoy_v1_currency_proto_init() {
	if File_fijoy_v1_currency_proto != nil {
		return
	}
	if !protoimpl.UnsafeEnabled {
		file_fijoy_v1_currency_proto_msgTypes[0].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*Currency); i {
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
		file_fijoy_v1_currency_proto_msgTypes[1].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*CurrencyList); i {
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
			RawDescriptor: file_fijoy_v1_currency_proto_rawDesc,
			NumEnums:      0,
			NumMessages:   2,
			NumExtensions: 0,
			NumServices:   1,
		},
		GoTypes:           file_fijoy_v1_currency_proto_goTypes,
		DependencyIndexes: file_fijoy_v1_currency_proto_depIdxs,
		MessageInfos:      file_fijoy_v1_currency_proto_msgTypes,
	}.Build()
	File_fijoy_v1_currency_proto = out.File
	file_fijoy_v1_currency_proto_rawDesc = nil
	file_fijoy_v1_currency_proto_goTypes = nil
	file_fijoy_v1_currency_proto_depIdxs = nil
}
