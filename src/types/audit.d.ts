type AuditLogParams = {
  action: string;
  description: string;
  ipAddress?: string;
};

type Audit = {
  id: string;
  action: string;
  description?: string;
  createdAt: string;
  member?: { name: string };
  event?: { title: string };
  performedBy?: { name: string };
};

type AuditSearchProps = {
  value: string;
  onChange: (v: string) => void;
};