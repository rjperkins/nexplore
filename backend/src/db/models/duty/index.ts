import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import { v4 as uuid } from 'uuid';
import { Duty } from '../../../lib/Types';
import { pool } from '../../connections';

export default class DutyModel {
  static createDuty = (req: Request, res: Response) => {
    const { name } = req.body;

    pool.query(
      'INSERT INTO duty ("Id", "Name") VALUES ($1, $2)',
      [uuid(), name],
      (error: Error, results: QueryResult<Duty>) => {
        if (error) {
          throw error;
        }

        res.status(201).send(`Duty created.`);
      }
    );
  };

  static getDuties = (_: Request, res: Response) => {
    pool.query('SELECT * FROM duty ORDER BY "Id" ASC', (error, results) => {
      if (error) {
        throw error;
      }

      res.status(200).json(results.rows);
    });
  };

  static getDutyById = (req: Request, res: Response) => {
    const id = req.params.id;

    pool.query('SELECT * FROM duty WHERE "Id" = $1', [id], (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    });
  };

  static updateDuty = (req: Request, res: Response) => {
    const id = req.params.id;
    const { name } = req.body;

    pool.query(
      'UPDATE duty SET "Name" = $1 WHERE "Id" = $2',
      [name, id],
      (error, _) => {
        if (error) {
          throw error;
        }
        res.status(200).send(`Duty ${id} updated.`);
      }
    );
  };

  static deleteDuty = (req: Request, res: Response) => {
    const id = req.params.id;

    pool.query('DELETE FROM duty WHERE "Id" = $1', [id], (error, _) => {
      if (error) {
        throw error;
      }
      res.status(200).send(`Duty ${id} deleted.`);
    });
  };
}
