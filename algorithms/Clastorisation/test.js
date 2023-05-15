const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}
const asyncFoo = async () => {
    await sleep(2000);
    console.log('look at this');
    await sleep(1000);
    console.log('getting fancy now');
}

asyncFoo()