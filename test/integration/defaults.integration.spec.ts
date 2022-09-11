import { Jelban } from '../../src/lib/Jelban';

describe('Defaults', () => {
  let jelban: Jelban;

  beforeEach(() => {
    jelban = new Jelban();
  });

  describe('valid emails', () => {
    describe('Gmail', () => {
      it.each(['karantika@gmail.com', 'karan.tika@gmail.com', 'Karantika@gmail.com', 'Karantika+food@gmail.com'])(
        'should return true for %s',
        (input) => {
          expect(jelban.isValid(input)).toBe(true);
        },
      );
    });
    describe('Outlook', () => {
      it.each([
        'karantika@windowslive.com',
        'karan.tika@hotmail.com',
        'Karantika@live.com',
        'Karantika+food@outlook.com',
      ])('should return true for %s', (input) => {
        expect(jelban.isValid(input)).toBe(true);
      });
    });

    describe('Temporary email addresses', () => {
      it.each([['kavi@boxomail.live', 'Mohmal']])(
        'should throw the email address is a temporary email from "$_service" ($emailAddress)',
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        (emailAddress, _service) => {
          expect(jelban.isValid(emailAddress)).toBe(false);
        },
      );
    });
  });
});
