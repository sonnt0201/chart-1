import { Table } from "react-bootstrap";
import "./MyTable.css"
// records is payload from the server
export const MyTable = ({ records }) => {
  // return table present records
  return (
    <Table className="table" striped bordered hover >
      <thead>
        <tr>
          <th>ID</th>
          <th>Device ID</th>
          <th>Voltages</th>
          <th>Timestamp</th>
        </tr>
      </thead>
      <tbody>
        {records &&
          records.map((record) => (
            <tr>
              <th>{record.id}</th>
              <th>{record["esp_id"]}</th>
              <th>
                {record["voltages"].map((vol) => (
                  <VolChunk vol={vol} />
                ))}
              </th>
              <th>
                {(() => {
                  const date = new Date(record.timestamp * 1000);
                  return date.toLocaleString();
                })()}
              </th>
            </tr>
          ))}
      </tbody>
    </Table>
  );
};

const VolChunk = ({ vol }) => <span className="chunk">{vol + " "}</span>;
