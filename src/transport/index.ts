import { Dispatch } from 'react';

import { PageStatuses } from '../pages/types';
import { Action, ActionTypes } from '../state/types';
import {
  RegistryDto,
  LoginDto,
  ConditionsDto,
  IndiInfoDto,
  OwnerInfoDto,
} from './dto';

export default {
  async login(loginDto: LoginDto, dispatch: Dispatch<Action>) {
    dispatch({ type: ActionTypes.SET_IS_LOADING, payload: true });

    const response: Response = await fetch(
      `${process.env.REACT_APP_API_URL}/auth/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(loginDto),
      },
    );

    if (response.status === 200) {
      const application = await response.json();

      dispatch({
        type: ActionTypes.SET_APPLICATION_DATA,
        payload: application,
      });
      dispatch({ type: ActionTypes.SET_IS_LOADING, payload: false });
    }

    if (response.status === 204) {
      dispatch({
        type: ActionTypes.CHANGE_STATUS,
        payload: PageStatuses.LOGIN_PAGE,
      });
      dispatch({ type: ActionTypes.SET_IS_LOADING, payload: false });
    }
  },

  async registry(registryDto: RegistryDto) {
    const response: Response = await fetch(
      `${process.env.REACT_APP_API_URL}/auth/registry`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(registryDto),
      },
    );

    if (response.status !== 200) {
      return Promise.reject();
    }

    return await response.json();
  },

  async changeApplicationStatus(applicationId: string, status: PageStatuses) {
    const response: Response = await fetch(
      `${process.env.REACT_APP_API_URL}/application/${applicationId}/action/${status}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
      },
    );

    if (response.status !== 200) {
      return Promise.reject();
    }

    return await response.json();
  },

  async updateConditions(applicationId: string, conditionsDto: ConditionsDto) {
    const response: Response = await fetch(
      `${process.env.REACT_APP_API_URL}/application/${applicationId}/conditions`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(conditionsDto, (key, value) => {
          if (key === 'monthlyPayment') {
            return undefined;
          }

          return value;
        }),
      },
    );

    return response.status === 200 ? Promise.resolve() : Promise.reject();
  },

  async updateOwnerInfo(applicationId: string, ownerInfoDto: OwnerInfoDto) {
    const response: Response = await fetch(
      `${process.env.REACT_APP_API_URL}/application/${applicationId}/owner`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(ownerInfoDto),
      },
    );

    return response.status === 200 ? Promise.resolve() : Promise.reject();
  },

  async updateIndiInfo(applicationId: string, indiInfoDto: IndiInfoDto) {
    const response: Response = await fetch(
      `${process.env.REACT_APP_API_URL}/application/${applicationId}/indi`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(indiInfoDto),
      },
    );

    return response.status === 200 ? Promise.resolve() : Promise.reject();
  },

  async submitApplication(applicationId: string) {
    const response: Response = await fetch(
      `${process.env.REACT_APP_API_URL}/application/${applicationId}/submit`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
      },
    );

    if (response.status !== 200) {
      return Promise.reject();
    }

    return await response.json();
  },
};
