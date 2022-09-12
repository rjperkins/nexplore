import DutyModel from '../db/models/duty';
import { Pool } from 'pg';
import * as uuid from 'uuid';

jest.mock('uuid');

jest.mock('pg', () => {
  const poolMock = {
    connect: jest.fn(),
    query: jest.fn(),
    end: jest.fn(),
  };
  return { Pool: jest.fn(() => poolMock) };
});

describe('DutyModel', () => {
  const uuidSpy = jest.spyOn(uuid, 'v4');
  uuidSpy.mockReturnValue('test-id');

  let pool: Pool;
  beforeEach(() => {
    pool = new Pool();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createDuty', () => {
    test('should call database pool with expected payload', async () => {
      const mockReq = {
        body: { name: 'test-name' },
      };
      await DutyModel.createDuty(mockReq as any, {} as any);
      expect(pool.connect).toBeCalledTimes(1);
      expect(pool.query).toHaveBeenNthCalledWith(
        2,
        `INSERT INTO duty ("Id", "Name") VALUES ($1, $2)`,
        ['test-id', 'test-name'],
        expect.anything()
      );
    });
  });

  describe('getDuties', () => {
    test('should call database pool with expected payload', async () => {
      await DutyModel.getDuties({} as any, {} as any);

      expect(pool.query).toHaveBeenCalledWith(
        `SELECT * FROM duty ORDER BY "Id" ASC`,
        expect.anything()
      );
    });
  });

  describe('updateDuty', () => {
    test('should call database pool with expected payload', async () => {
      const mockReq = {
        params: { id: 'test-id' },
        body: { name: 'test-name' },
      };

      await DutyModel.updateDuty(mockReq as any, {} as any);

      expect(pool.query).toHaveBeenCalledWith(
        `UPDATE duty SET "Name" = $1 WHERE "Id" = $2`,
        ['test-name', 'test-id'],
        expect.anything()
      );
    });
  });

  describe('deleteDuty', () => {
    test('should call database pool with expected payload', async () => {
      const mockReq = {
        params: { id: 'test-id' },
      };

      await DutyModel.deleteDuty(mockReq as any, {} as any);

      expect(pool.query).toHaveBeenCalledWith(
        `DELETE FROM duty WHERE "Id" = $1`,
        ['test-id'],
        expect.anything()
      );
    });
  });
});
