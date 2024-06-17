/* tslint:disable */
/* eslint-disable */
export const memory: WebAssembly.Memory;
export function setup_logging(): void;
export function __wbg_node_free(a: number): void;
export function __wbg_nodeconfig_free(a: number): void;
export function __wbg_get_nodeconfig_network(a: number): number;
export function __wbg_set_nodeconfig_network(a: number, b: number): void;
export function __wbg_get_nodeconfig_genesis_hash(a: number, b: number): void;
export function __wbg_set_nodeconfig_genesis_hash(a: number, b: number, c: number): void;
export function __wbg_get_nodeconfig_bootnodes(a: number, b: number): void;
export function __wbg_set_nodeconfig_bootnodes(a: number, b: number, c: number): void;
export function node_new(a: number): number;
export function node_local_peer_id(a: number, b: number): void;
export function node_peer_tracker_info(a: number, b: number): void;
export function node_wait_connected(a: number): number;
export function node_wait_connected_trusted(a: number): number;
export function node_network_info(a: number): number;
export function node_listeners(a: number): number;
export function node_connected_peers(a: number): number;
export function node_set_peer_trust(a: number, b: number, c: number, d: number): number;
export function node_request_head_header(a: number): number;
export function node_request_header_by_hash(a: number, b: number, c: number): number;
export function node_request_header_by_height(a: number, b: number): number;
export function node_request_verified_headers(a: number, b: number, c: number): number;
export function node_syncer_info(a: number): number;
export function node_get_network_head_header(a: number, b: number): void;
export function node_get_local_head_header(a: number): number;
export function node_get_header_by_hash(a: number, b: number, c: number): number;
export function node_get_header_by_height(a: number, b: number): number;
export function node_get_headers(a: number, b: number, c: number, d: number, e: number): number;
export function node_get_sampling_metadata(a: number, b: number): number;
export function node_events_channel(a: number, b: number): void;
export function nodeconfig_default(a: number): number;
export function __wbg_networkinfo_free(a: number): void;
export function networkinfo_num_peers(a: number): number;
export function networkinfo_connection_counters(a: number): number;
export function __wbg_connectioncounters_free(a: number): void;
export function connectioncounters_num_connections(a: number): number;
export function connectioncounters_num_pending(a: number): number;
export function connectioncounters_num_pending_incoming(a: number): number;
export function connectioncounters_num_pending_outgoing(a: number): number;
export function connectioncounters_num_established_incoming(a: number): number;
export function connectioncounters_num_established_outgoing(a: number): number;
export function connectioncounters_num_established(a: number): number;
export function __wbindgen_malloc(a: number, b: number): number;
export function __wbindgen_realloc(a: number, b: number, c: number, d: number): number;
export const __wbindgen_export_2: WebAssembly.Table;
export function _dyn_core__ops__function__FnMut_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hd729337076372289(a: number, b: number): void;
export function _dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hc48d7f01eb75e078(a: number, b: number, c: number): void;
export function _dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hd15c037651943fee(a: number, b: number, c: number): void;
export function _dyn_core__ops__function__FnMut_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h96cd4f3b47f3944f(a: number, b: number): void;
export function __wbindgen_add_to_stack_pointer(a: number): number;
export function _dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h966003e6c708030b(a: number, b: number, c: number, d: number): void;
export function __wbindgen_free(a: number, b: number, c: number): void;
export function __wbindgen_exn_store(a: number): void;
export function wasm_bindgen__convert__closures__invoke2_mut__h75e6a00b34c272b0(a: number, b: number, c: number, d: number): void;
export function __wbindgen_start(): void;