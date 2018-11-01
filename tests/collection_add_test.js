"use strict";

(() => {
    const Collection = require('../src/collection');

    const fs = require('fs'),
        chai = require('chai'),
        expect = chai.expect,
        should = chai.should();

    describe('Adding new icons', () => {
        it('adding icons', () => {
            let collection = new Collection();

            // Add item without prefix
            expect(collection.addIcon('foo', {
                body: '<foo />'
            })).to.be.equal(false);
            expect(collection.iconExists('foo')).to.be.equal(false);

            // Set prefix and try again
            collection = new Collection('test-prefix');
            expect(collection.addIcon('foo', {
                body: '<foo />'
            })).to.be.equal(true);
            expect(collection.iconExists('foo')).to.be.equal(true);

            // Add few more icons
            expect(collection.addIcon('bar', {
                body: '<bar />'
            })).to.be.equal(true);
            expect(collection.addIcon('baz', {
                body: '<baz />'
            })).to.be.equal(true);

            // Add aliases
            expect(collection.addAlias('bar2', 'bar', {
                rotate: 1
            })).to.be.equal(true);
            expect(collection.addAlias('bar3', 'bar2', {
                hFlip: true
            })).to.be.equal(true);
            expect(collection.addAlias('foo2', 'foo1', {
                hFlip: true
            })).to.be.equal(false);

            // Get JSON data
            expect(collection.getIcons()).to.be.eql({
                prefix: 'test-prefix',
                icons: {
                    foo: {
                        body: '<foo />'
                    },
                    bar: {
                        body: '<bar />'
                    },
                    baz: {
                        body: '<baz />'
                    }
                },
                aliases: {
                    bar2: {
                        parent: 'bar',
                        rotate: 1
                    },
                    bar3: {
                        parent: 'bar2',
                        hFlip: true
                    }
                }
            });

            // Get everything except 'foo'
            expect(collection.getIcons(['bar3', 'baz'])).to.be.eql({
                prefix: 'test-prefix',
                icons: {
                    bar: {
                        body: '<bar />'
                    },
                    baz: {
                        body: '<baz />'
                    }
                },
                aliases: {
                    bar2: {
                        parent: 'bar',
                        rotate: 1
                    },
                    bar3: {
                        parent: 'bar2',
                        hFlip: true
                    }
                }
            });
        });
    });
})();