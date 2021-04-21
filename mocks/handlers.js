import { rest } from 'msw';
import printers from './data.json';

export const handlers = [
  rest.get('https://my.backend/list', (req, res, ctx) => {
    const searchParams = req.url.searchParams.get('search');

    const getFilteredPrinters = () =>
      printers.data.filter(printer =>
        printer.title.toLowerCase().includes(searchParams.toLowerCase()),
      );

    if (searchParams === null) {
      return res(ctx.delay(), ctx.json(printers.data));
    } else {
      return res(ctx.delay(), ctx.json(getFilteredPrinters()));
    }
  }),
];
