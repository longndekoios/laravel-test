export interface DispatchLog {
  id: number;
  payload_id: number;
  partner_id: number;
  sent_payload: string;
  sent_at: Date;
  response_status: number;
  response_payload: string;
}
