"""An in-memory implementation of `db.DB` is used for the tests."""

from os import environ
import psycopg2
import psycopg2.extras

_db_conn = dict(
    user=environ.get("POSTGRES_USER", "postgres"),
    password=environ.get("POSTGRES_PASSWORD", "password"),
    host=environ.get("POSTGRES_HOST", "localhost"),
    port=environ.get("POSTGRES_PORT", "6660"),
    database=environ.get("POSTGRES_DB", "planet"),
)

class DevDB():

    def __init__(self):
        self.conn = psycopg2.connect(**_db_conn)
        self.conn.autocommit = True
        self.cursor = self.conn.cursor()

    def create_figures(
            self, figures: list
        ) -> None:
        """Creates figure in the DB.
        Args:
            figures: An instance of `model.Figure` with the known
                fields filled. The field `id` must be `None` and will be filled
                by the database implementation.

        Returns:
            None
        """

        try:
            data = [(figure.org_id, figure.figure) for figure in figures]
            insert_query = 'insert into figures (org_id, figure) values %s'
            psycopg2.extras.execute_values (
               self.cursor, insert_query, data
            )
        except Exception as err:
            raise Exception(f'Could not add figure into db: {err}')
        
    def get_org_ids(self) -> list:
        """Get the organisations IDs from the DB.
        Returns:
            A list of the organisation IDs.
        """
        try:
            self.cursor.execute("SELECT DISTINCT org_id from figures;")
            result = self.cursor.fetchall()
            org_ids = [row[0] for row in result]
            return org_ids
        except Exception as err:
            raise Exception(f'Could not get organisation IDs: {err}')
        
    def get_figures(self) -> list:
        """Get all figures.
        Returns:
            All figures in the DB.
        """
        try:
            self.cursor.execute("SELECT id, org_id, ST_Astext(figure) FROM figures;")
            figures = self.cursor.fetchall()
            return figures
        except Exception as err:
            raise Exception(f'Could not get figures: {err}')