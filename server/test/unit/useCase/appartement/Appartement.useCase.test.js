const {
  addAppartementUseCase,
  getAllAppartementUseCase,
  deleteAppartementUseCase,
  updateAppartementUseCase,
} = require("../../../../src/useCases/appartment");

jest.mock("../../../../src/fremworks/repository/mongo", () => ({
  appartementRepository: {
    add: jest.fn(async (appartement) => ({
      ...appartement,
    })),
    getAll: jest.fn(async () => {
      return [
        {
          id: null,
          status: false,
          number: "N12123",
          price: 100,
          address: "address test",
          city: "city test",
          surface: 100,
          rooms: 10,
          bedrooms: 4,
          parking: false,
          garden: false,
          user: "kj12414",
        },
      ];
    }),
    delete: jest.fn(async (appartement) => {
      return appartement;
    }),
    update: jest.fn(async (appartement) => {
      return appartement;
    }),
  },
}));

describe("UseCase Appartement", () => {
  const expectedResponse = {
    id: null,
    status: false,
    number: "N12123",
    price: 100,
    address: "address test",
    city: "city test",
    surface: 100,
    rooms: 10,
    bedrooms: 4,
    parking: false,
    garden: false,
    user: "kj12414",
  };

  const mockReq = {
    body: {
      id: null,
      status: false,
      number: "N12123",
      price: 100,
      address: "address test",
      city: "city test",
      surface: 100,
      rooms: 10,
      bedrooms: 4,
      parking: false,
      garden: false,
      user: "kj12414",
    },
  };
  const mockRes = {
    status: jest.fn(),
    json: jest.fn(),
    response: expectedResponse,
  };

  test("add appartement", async () => {
    const useCaseInstance = addAppartementUseCase();
    const response = await useCaseInstance.execute(
      mockReq.body.number,
      mockReq.body.price,
      mockReq.body.status,
      mockReq.body.city,
      mockReq.body.address,
      mockReq.body.surface,
      mockReq.body.rooms,
      mockReq.body.bedrooms,
      mockReq.body.parking,
      mockReq.body.garden,
      mockReq.body.user
    );
    expect(response).toEqual(mockRes.response);
  });

  test("get all appartement", async () => {
    const useCaseInstance = getAllAppartementUseCase();
    const response = await useCaseInstance.execute();
    expect(response).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: null,
          status: false,
          number: "N12123",
          price: 100,
          address: "address test",
          city: "city test",
          surface: 100,
          rooms: 10,
          bedrooms: 4,
          parking: false,
          garden: false,
          user: "kj12414",
        }),
      ])
    );
  });
  test("delete appartement", async () => {
    const useCaseInstance = deleteAppartementUseCase();
    const response = await useCaseInstance.execute(expectedResponse.id);

    expect(response).toEqual({
      id: null,
      address: null,
      bedrooms: null,
      city: null,
      garden: null,
      number: null,
      parking: null,
      price: null,
      rooms: null,
      status: false,
      surface: null,
      user: null,
    });
  });

  test("update appartement", async () => {
    const useCaseInstance = updateAppartementUseCase();
    const response = await useCaseInstance.execute(expectedResponse);
    expect(response).toEqual(expectedResponse);
  });
});
