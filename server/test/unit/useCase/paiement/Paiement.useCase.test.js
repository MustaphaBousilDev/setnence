const {
  addPaiementUseCase,
  getAllPaiementUseCase,
} = require("../../../../src/useCases/payment");

jest.mock("../../../../src/fremworks/repository/mongo", () => ({
  paiementRepository: {
    add: jest.fn(async (paiement) => ({
      ...paiement,
    })),
    getAll: jest.fn(async () => {
      return [
        {
          appartement: "FSDF423FDSSF",
          client: "SDFSDF243324",
          datePaiement: "2000/12/12",
          montant: 200,
          user: "433E5F32D24C2R",
        },
      ];
    }),
  },
}));

describe("UseCase Paiement", () => {
  const expectedResponse = {
    appartement: "FSDF423FDSSF",
    client: "SDFSDF243324",
    datePaiement: "2000/12/12",
    montant: 200,
    user: "433E5F32D24C2R",
  };
  const mockReq = {
    body: {
      appartement: "FSDF423FDSSF",
      client: "SDFSDF243324",
      datePaiement: "2000/12/12",
      montant: 200,
      user: "433E5F32D24C2R",
    },
  };
  const mockRes = {
    status: jest.fn(),
    json: jest.fn(),
    response: expectedResponse,
  };

  test("add paiement", async () => {
    const useCaseInstance = addPaiementUseCase();
    const response = await useCaseInstance.execute(
      mockReq.body.appartement,
      mockReq.body.client,
      mockReq.body.datePaiement,
      mockReq.body.montant,
      mockReq.body.user
    );
    expect(response).toEqual(mockRes.response);
  });

  test("get all paiement", async () => {
    const useCaseInstance = getAllPaiementUseCase();
    const response = await useCaseInstance.execute();
    expect(response).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          appartement: "FSDF423FDSSF",
          client: "SDFSDF243324",
          datePaiement: "2000/12/12",
          montant: 200,
          user: "433E5F32D24C2R",
        }),
      ])
    );
  });
});
