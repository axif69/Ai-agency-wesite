import { db } from './db';

db.serialize(() => {
    db.run("UPDATE leads SET status='new' WHERE status='ready'", function(err) {
        if (err) console.error(err);
        else console.log(`Reset ${this.changes} leads back to 'new' so they get the new email template.`);
    });
});
