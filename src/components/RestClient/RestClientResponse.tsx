import React from 'react';
import RestClientSelectResponseParameters from './RestClientSelectResponseParameters';
import RestClientResponseEditor from './RestClientResponseEditor';
const RestClientResponse = ({ response }: { response: string }) => {
  console.log(response);

  return (
    <div>
      <h2 className="text-xl font-semibold">Response</h2>
      {response === '' ? (
        <div>No response</div>
      ) : (
        <div className="flex flex-col gap-3">
          <div className="flex gap-3">
            <RestClientSelectResponseParameters />
            <span>Status:</span>

            {/* <span>{response.status}</span> */}
          </div>
          <RestClientResponseEditor response={response} />
        </div>
      )}
    </div>
  );
};

export default RestClientResponse;
