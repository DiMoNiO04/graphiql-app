import React from 'react';
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from '../ui/table';

const RestClientResponseHeaders = ({ responseHeaders }: { responseHeaders: Record<string, string> }) => {
  return (
    <>
      {responseHeaders ? (
        <Table className="border-2 border-gray-200 rounded-md mt-1">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Key</TableHead>
              <TableHead className="w-1/2">Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Object.entries(responseHeaders).map(([header, value], index) => (
              <TableRow key={index}>
                <TableCell className="font-medium w-[300px]">{header}</TableCell>
                <TableCell className="">{value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className=" text-center p-4 text-xl font-medium py-10 ">
          <h2>No response headers</h2>
        </div>
      )}
    </>
  );
};

export default RestClientResponseHeaders;
