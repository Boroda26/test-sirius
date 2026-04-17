import axios from "axios";

export default {
  namespaced: true,

  state: {
    applications: [],
    loadingApplications: false,
    statuses: [
      {
        text: "Все",
        value: null,
      },
      {
        text: "Новая",
        value: "Новая",
      },
      {
        text: "В работе",
        value: "В работе",
      },
      {
        text: "Одобрена",
        value: "Одобрена",
      },
      {
        text: "Отклонена",
        value: "Отклонена",
      },
    ],
  },

  mutations: {
    setApplications(state, applications) {
      state.applications = applications;
    },
    setLoadingApplications(state, loading) {
      state.loadingApplications = loading;
    },
    setApplication(state, application) {
      state.applications = state.applications.map((app) =>
        app.id === application.id ? application : app,
      );
    },
  },

  actions: {
    async getApplications({ commit }, params) {
      try {
        commit("setLoadingApplications", true);
        const response = await axios.get(
          "https://69e221fab1cb62b9f317cf85.mockapi.io/app",
          {
            params,
          },
        );
        commit("setApplications", response.data);
        commit("setLoadingApplications", false);
      } catch (error) {
        commit("setLoadingApplications", false);
        commit("setApplications", []);
        console.error(error);
      }
    },
    async updateApplication({ commit }, application) {
      try {
        await axios.put(
          `https://69e221fab1cb62b9f317cf85.mockapi.io/app/${application.id}`,
          application,
        );
        commit("setApplication", application);
      } catch (error) {
        console.error(error);
      }
    },
  },

  getters: {
    applications: (state) => state.applications,
    loadingApplications: (state) => state.loadingApplications,
    statuses: (state) => state.statuses,
  },
};
