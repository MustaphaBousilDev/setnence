const {
  addClientUseCase,
  getAllClientUseCase,
} = require("../../../../src/useCases/guasts");

jest.mock("../../../../src/fremworks/repository/mongo", () => ({
  clientRepository: {
    add: jest.fn(async (appartement) => ({
      ...appartement,
    })),
    getAll: jest.fn(async () => {
      return [
        {
          cin: "AZ12",
          first_name: "firstname test",
          last_name: "lastname test",
          email: "email@gmail.com",
          phone: "0121234568",
          user: "433E5F32D24C2R",
        },
      ];
    }),
  },
}));

describe("UseCase Client", () => {
  const expectedResponse = {
    id: null,
    cin: "AZ12",
    first_name: "firstname test",
    last_name: "lastname test",
    email: "email@gmail.com",
    phone: "0121234568",
    user: "433E5F32D24C2R",
  };
  const mockReq = {
    body: {
      id: null,
      cin: "AZ12",
      first_name: "firstname test",
      last_name: "lastname test",
      email: "email@gmail.com",
      phone: "0121234568",
      user: "433E5F32D24C2R",
    },
  };
  const mockRes = {
    status: jest.fn(),
    json: jest.fn(),
    response: expectedResponse,
  };

  test("add client", async () => {
    const useCaseInstance = addClientUseCase();
    const response = await useCaseInstance.execute(
      mockReq.body.cin,
      mockReq.body.first_name,
      mockReq.body.last_name,
      mockReq.body.email,
      mockReq.body.phone,
      mockReq.body.user
    );
    expect(response).toEqual(mockRes.response);
  });

  test("get all client", async () => {
    const useCaseInstance = getAllClientUseCase();
    const response = await useCaseInstance.execute();
    expect(response).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          cin: "AZ12",
          first_name: "firstname test",
          last_name: "lastname test",
          email: "email@gmail.com",
          phone: "0121234568",
          user: "433E5F32D24C2R",
        }),
      ])
    );
  });
});
