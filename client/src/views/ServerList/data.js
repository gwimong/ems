import uuid from "uuid/v1";

export default [
  {
    id: uuid(),
    used: 0,
    health: 0,
    owner: "관리자",
    server_name: "SU-SW201",
    server_ip: "192.168.0.0",
    purpose: "사내 시스템 운용",
    device_div: 0,
    device_manufacturer: 0,
    device_type: 0,
    device_model: "DL150 Gen9",
    device_location: "서버실 x-10",
    device_size: 1,
    storage: "- / - / - / -",
    memory: "- / - / - / -",
    gpu: "없음",
    ipmi_ip: "192.168.12.0",
    ipmi_account: "ADMIN",
    ipmi_password: "ADMIN",
    os_type: 0,
    os_name: 0,
    update_date: "2020-03-01 00:11:22",
    create_date: "2020-03-01 00:11:22",
    comment: "샘플 데이터입니다.",
  }
];
