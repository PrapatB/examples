import fetch from 'node-fetch';
import * as db from './db';

const apiServerAddress =
  process.env.API_SERVER_ADDRESS || 'http://localhost:8081';

export const getCallbackUrl = async () => {
  try {
    const response = await fetch(`${apiServerAddress}/idp/callback`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw response;
    }

    let responseJson = await response.json();

    return responseJson;
  } catch (error) {
    throw error;
  }
};

export const setCallbackUrl = async ({ url }) => {
  try {
    const response = await fetch(`${apiServerAddress}/idp/callback`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url,
      }),
    });

    if (!response.ok) {
      throw response;
    }

    // let responseJson = await response.json();

    // return responseJson;
    return;
  } catch (error) {
    throw error;
  }
};

export const createIdpResponse = async ({
  request_id,
  namespace,
  identifier,
  ial,
  aal,
  secret,
  status,
  signature,
  accessor_id,
}) => {
  try {

    //TODO
    //get secret, accessor_private_key, etc... from persistent

    const response = await fetch(`${apiServerAddress}/idp/response`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        request_id,
        namespace,
        identifier,
        ial,
        aal,
        secret,
        status,
        signature,
        accessor_id,
      }),
    });

    if (!response.ok) {
      if (response.status === 400) {
        let responseJson = await response.json();
        console.error(responseJson);
      }
      throw response;
    }

    let responseJson = await response.json();

    return responseJson;
  } catch (error) {
    throw error;
  }
};

export async function createNewIdentity(data) {
  try {
    const response = await fetch(`${apiServerAddress}/identity`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw response;
    }

    //TODO
    //store secret, accessor_private_key, etc to persistent database

    return;
  } catch (error) {
    throw error;
  }
}
