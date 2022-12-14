import { PageStatuses } from '../pages/types';
import { AuthDto, ConditionsDto, IndiInfoDto, OwnerInfoDto } from './dto';

export default {
  async logIn(authDto: AuthDto) {
    const response: Response = await fetch(
      `${process.env.REACT_APP_API_URL}/auth`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(authDto),
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
};
